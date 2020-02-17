using System.Threading.Tasks;
using botwat.ch.Data;

namespace botwat.ch.Services
{
    public interface IBotClientService
    {
        Task<BotClient> Create(BotClient client);
        Task<BotClient> Find(BotClient client);
    }

    public class BotClientService : IBotClientService
    {
        public Task<BotClient> Create(BotClient client)
        {
            throw new System.NotImplementedException();
        }

        public Task<BotClient> Find(BotClient client)
        {
            throw new System.NotImplementedException();
        }
    }
}