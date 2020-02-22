using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Data.Transport.Request;
using botwat.ch.Data.Transport.Request.User;
using botwat.ch.Data.Transport.Response;
using botwat.ch.Data.Transport.Response.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace botwat.ch.Services
{
    public interface IUserService
    {
        Task<UserAuthenticateResponse> Authenticate(UserAuthenticateRequest user);
        Task<UserCreateResponse> Create(UserCreateRequest user);
        Task<User> Find(User user);
    }

    public class UserService : BaseService, IUserService
    {
        public UserService(DatabaseContext context) : base(context)
        {
        }

        public async Task<UserAuthenticateResponse> Authenticate(UserAuthenticateRequest request)
        {
            var result = await Find(request);
            if (result == null) throw new DataException("Credentials invalid.");
            return new UserAuthenticateResponse {Name = result.Name, Token = request.Token};
        }

        public async Task<UserCreateResponse> Create(UserCreateRequest user)
        {
            var error = await RespondCreateError(user);
            if (error != null) throw new DataException(error);

            var result = await Find(user);
            if (result == null)
            {
                await _context.Users.AddAsync(new User
                {
                    Email = user.Email,
                    Name = user.Name,
                    Password = user.Password
                });
                await _context.SaveChangesAsync();
                result = await Find(user);
                if (result != null)
                {
                    result.Token = GenerateToken(result.Id);
                    await _context.SaveChangesAsync();
                    return new UserCreateResponse
                    {
                        Id = result.Id, 
                        Name = result.Name, 
                        Email = result.Email,
                        DiscordHandle = result.DiscordHandle,
                        Token = result.Token
                    };
                }
            }

            throw new DataException("Unable to create user: unknown reason");
        }

        private async Task<string> RespondCreateError(UserCreateRequest user)
        {
            if (user.Password.Length < 7)
                return "Password must be at least 7 characters.";
            if (await _context.Users.AnyAsync(u => u.Name == user.Name))
                return "Username already exists. Please choose another one.";
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                return "Email already in use. Please use a different email.";
            return null;
        }

        public async Task<User> Find(UserAuthenticateRequest user) => await _context.Users.FirstOrDefaultAsync(x =>
            x.Name == user.Name && x.Token == user.Token
        );

        public async Task<User> Find(UserCreateRequest user) => await _context.Users.FirstOrDefaultAsync(x =>
            x.Name == user.Name || x.Email == user.Email
        );

        public async Task<User> Find(User user) => await _context.Users.FirstOrDefaultAsync(x =>
            x.Name == user.Name && x.Email == user.Email && x.Token == user.Token
        );

        private static string GenerateToken(int id)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Startup.Configuration["jwt_key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, id.ToString())
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