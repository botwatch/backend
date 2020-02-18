using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IBotClientService
    {
        Task<BotClient> Create(BotClient client);
        Task<BotClient> Find(BotClient client);
    }

    public class BotClientService : BaseService, IBotClientService
    {
        public BotClientService(DatabaseContext context) : base(context)
        {
        }

        public async Task<BotClient> Create(BotClient client)
        {
            if (await Find(client) != null) return null;
            var result = await _context.BotClients.AddAsync(client);
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<BotClient> Find(BotClient client)
        {
            return await _context.BotClients.FirstOrDefaultAsync(
                x => x.Id == client.Id ||
                     x.Name == client.Name
            );
        }
    }
}