using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace botwat.ch.Services
{
    public class UserService
    {
        public User Authenticate(string username, string saltedPassword)
        {
            var user = DbProvider.Context.Users.SingleOrDefault(u =>
                u.Name == username && u.SaltedPassword == saltedPassword
            );

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("test123");
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
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
    }
}