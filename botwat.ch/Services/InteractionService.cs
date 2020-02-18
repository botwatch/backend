using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IInteractionService
    {
        Task<Interaction> Create(Interaction interaction);
        Task<Interaction> Find(Interaction interaction);
    }

    public class InteractionService : BaseService, IInteractionService
    {
        public InteractionService(DatabaseContext context) : base(context)
        {
        }

        public async Task<Interaction> Create(Interaction interaction)
        {
            if (await Find(interaction) != null) return null;
            var result = await _context.Interactions.AddAsync(interaction);
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<Interaction> Find(Interaction interaction)
        {
            return await _context.Interactions.FirstOrDefaultAsync(
                x => x.Id == interaction.Id
            );
        }
    }
}