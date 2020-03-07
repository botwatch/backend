using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;

namespace botwat.ch.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string name, string tokenOrPassword, bool isToken = true);
        Task<User> Create(string name, string email, string password);
        Task<User> Find(User user);
        Task<User> Find(string name);
    }

    public class UserService : BaseService, IUserService
    {
        private readonly IActionContextAccessor _accessor;

        public UserService(DatabaseContext context, IActionContextAccessor accessor) : base(context)
        {
            _accessor = accessor;
        }

        public async Task<string> GetTokenAsync()
        {
            var httpContext = _accessor.ActionContext.HttpContext;
            if (!httpContext.User.Identity.IsAuthenticated)
            {
                return null;
            }

            var tk = await httpContext.GetTokenAsync("Discord", "access_token");
            return tk;
        }

        public async Task<User> Authenticate(string name, string tokenOrPassword, bool isToken = true)
        {
            var result = await Find(name);
            if (result == null) throw new DataException("Credentials invalid.");
            if (isToken && result.Token == tokenOrPassword) return result.Safe();
            if (!isToken && result.Password == tokenOrPassword) return result.Safe();
            throw new DataException("Token/password invalid.");
        }

        public async Task<User> Create(string name, string email, string password)
        {
            var user = new User {Name = name, Email = email, Password = password};
            var error = await RespondCreateError(user);
            if (error != null) throw new DataException(error);

            var result = await Find(user);
            if (result == null)
            {
                var addResult = await _context.Users.AddAsync(user);
                result = addResult.Entity;
                if (result != null)
                {
                    result.Token = GenerateToken(result);
                    result.IpAddress = _accessor.ActionContext.HttpContext.Connection.RemoteIpAddress.ToString();
                    await _context.SaveChangesAsync();
                    return result;
                }
            }

            throw new DataException("Unable to create user: unknown reason");
        }

        private async Task<string> RespondCreateError(User user)
        {
            if (user.Password.Length < 7)
                return "Password must be at least 7 characters.";
            if (await _context.Users.AnyAsync(u => u.Name == user.Name))
                return "Username already exists. Please choose another one.";
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return "Email already in use. Please use a different email.";
            return null;
        }

        public async Task<User> Find(User user) => await _context.Users.FirstOrDefaultAsync(x =>
            x.Name == user.Name && x.Email == user.Email && x.Token == user.Token
        );

        public Task<User> Find(string name) => _context.Users.FirstOrDefaultAsync(user => user.Name == name);

        private static string GenerateToken(User user)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Startup.Configuration["jwt_key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Sid, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}