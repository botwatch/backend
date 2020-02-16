using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Internal;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace botwat.ch.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(User credentials);
        Task<User> Create(User credentials);
    }

    public class UserService : IUserService
    {
        private readonly DatabaseContext _context;

        public UserService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(User credentials)
        {
            var user = await Find(credentials);
            return user?.WithoutPassword();
        }

        public async Task<User> Create(User credentials)
        {
            var user = await Find(credentials);
            if (user == null)
            {
                await _context.Users.AddAsync(new User
                {
                    Email = credentials.Email,
                    Name = credentials.Name,
                    Password = credentials.Password
                });
                await _context.SaveChangesAsync();
                user = await Find(credentials);
                if (user != null)
                {
                    user.Token = GenerateToken(user);
                    await _context.SaveChangesAsync();
                    return user.WithoutPassword();
                }
            }

            return null;
        }

        private async Task<User> Find(User credentials) => await _context.Users.FirstOrDefaultAsync(x =>
            x.Name == credentials.Name && (
                x.Password == credentials.Password ||
                x.Token != null &&
                x.Token == credentials.Token
            )
        );


        private static string GenerateToken(User user)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Startup.Configuration["jwt_key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
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