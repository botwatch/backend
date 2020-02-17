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
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace botwat.ch.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(User user);
        Task<User> Create(User user);
        Task<User> Find(User user);
    }

    public class UserService : IUserService
    {
        private readonly DatabaseContext _context;

        public UserService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(User user)
        {
            var result = await Find(user);
            return result?.WithoutPassword();
        }

        public async Task<User> Create(User user)
        {
            var error = await RespondCreateError(user);
            if (error != null) throw new ArgumentException(error);

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
                    result.Token = GenerateToken(result);
                    await _context.SaveChangesAsync();
                    return result.WithoutPassword();
                }
            }

            return null;
        }

        private async Task<string> RespondCreateError(ICredentials user)
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
            x.Name == user.Name && (
                x.Password == user.Password ||
                x.Token != null &&
                x.Token == user.Token
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