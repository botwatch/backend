using System.Collections.Generic;
using System.Linq;
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
        Task<Interaction[][]> Find(int[] ids);
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
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Interaction> Find(Interaction interaction)
        {
            return await _context.Interactions.FirstOrDefaultAsync(
                x => x.Id == interaction.Id
            );
        }

        public async Task<Interaction[][]> Find(int[] ids)
        {
            var actions = await _context.Interactions.Where(action => ids.Contains(action.SessionId)).ToListAsync();
            return actions.GroupBy(a => a.SessionId)
                .Select(group => group.ToArray())
                .ToArray();
        }

        public IAsyncEnumerable<Interaction> ForUser(User user)
        {
            return _context.Interactions
                .Where(i => _context.Sessions.FirstOrDefault(s => s.Id == i.SessionId).User == user)
                .AsAsyncEnumerable();
        }
    }
}