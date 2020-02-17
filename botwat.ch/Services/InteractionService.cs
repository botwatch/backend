using System.Threading.Tasks;
using botwat.ch.Data;

namespace botwat.ch.Services
{
    public interface IInteractionService
    {
        Task<Interaction> Create(Interaction interaction);
        Task<Interaction> Find(Interaction interaction);
    }

    public class InteractionService : IInteractionService
    {
        public Task<Interaction> Create(Interaction interaction)
        {
            throw new System.NotImplementedException();
        }

        public Task<Interaction> Find(Interaction interaction)
        {
            throw new System.NotImplementedException();
        }
    }
}