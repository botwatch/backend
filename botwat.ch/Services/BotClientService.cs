using System;
using System.Data;
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
                //TODO map valid users...
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
    }
}