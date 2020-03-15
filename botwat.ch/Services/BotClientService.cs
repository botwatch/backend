using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IBotClientService
    {
        Task<BotClient> Find(string name);
        IAsyncEnumerable<BotClient> All();
        Task<BotClient> Create(string name, string description, string url, string authors);
    }

    public class BotClientService : BaseService, IBotClientService
    {
        public BotClientService(DatabaseContext context) : base(context)
        {
        }

        public async Task<BotClient> Create(string name, string description, string url, string authors)
        {
            var client = await Find(name);
            if (client != null) throw new DataException($"Client named {name} already exists.");
            var authorNames = authors.Split(',');
            var result = await _context.BotClients.AddAsync(
                new BotClient
                {
                    Name = name,
                    Authors = _context.Users.Where(user => authorNames.Contains(user.Name)).ToList(),
                    Created = DateTime.Now,
                    Description = description,
                    Url = url
                });
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<BotClient> Find(string name)
        {
            return await _context.BotClients.FirstOrDefaultAsync(
                x => x.Name == name
            );
        }

        public IAsyncEnumerable<BotClient> All()
        {
            return _context.BotClients.AsAsyncEnumerable();
        }
    }
}