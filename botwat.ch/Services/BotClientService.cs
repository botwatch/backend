using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Data.Transport.Request.Client;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IBotClientService
    {
        Task<BotClient> Create(BotClientCreateRequest request);
        Task<BotClient> Find(string name);
        IAsyncEnumerable<BotClient> FindAll();
    }

    public class BotClientService : BaseService, IBotClientService
    {
        public BotClientService(DatabaseContext context) : base(context)
        {
        }

        public async Task<BotClient> Create(BotClientCreateRequest request)
        {
            var client = await Find(request.Name);
            if (client != null) throw new DataException($"Client named {request.Name} already exists.");
            var result = await _context.BotClients.AddAsync(BuildClient(request));
            return result.IsKeySet ? result.Entity : null;
        }

        private BotClient BuildClient(BotClientCreateRequest request)
        {
            return new BotClient
            {
                Authors = _context.Users.Where(user => request.AuthorNames.Contains(user.Name)).ToList(),
                Name = request.Name,
                Created = DateTime.Now,
                Description = request.Description,
                Url = request.Url
            };
        }

        public async Task<BotClient> Find(string name)
        {
            return await _context.BotClients.FirstOrDefaultAsync(
                x => x.Name == name
            );
        }

        public IAsyncEnumerable<BotClient> FindAll()
        {
            return _context.BotClients.AsAsyncEnumerable();
        }
    }
}