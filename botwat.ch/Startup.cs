using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using AspNetCoreRateLimit;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace botwat.ch
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            if (!Debugger.IsAttached)
                services.AddLetsEncrypt();

            services.AddControllersWithViews();
            services.AddControllers().AddNewtonsoftJson(x =>
            {
                x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            var key = Encoding.ASCII.GetBytes(Configuration["jwt_key"]);
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            
            services.AddOptions();
            services.AddMemoryCache();
            services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
            services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
            services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            
            var connectionString = Configuration.GetConnectionString("Master-Database");
            services.AddDbContextPool<DatabaseContext>(options => options
                .UseNpgsql(connectionString)
            );
            // configure DI for application services
            ConfigureDi(services);
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "Web/build/"; });
        }

        private static void ConfigureDi(IServiceCollection services)
        {
            services.AddScoped<IServicesPool, ServicesPool>();
            services.AddScoped<IBotClientService, BotClientService>();
            services.AddScoped<IExperienceService, ExperienceService>();
            services.AddScoped<IInteractionService, InteractionService>();
            services.AddScoped<IOldSchoolAccountService, OldSchoolAccountService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<IUserService, UserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DatabaseContext context)
        {
            context.Database.EnsureCreated();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

          //  app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseIpRateLimiting();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Web";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
        }
    }
}