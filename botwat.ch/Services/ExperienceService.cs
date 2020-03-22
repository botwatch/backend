using System.Linq;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IExperienceService
    {
        Task<Experience> Create(Experience experience);
        Task<Experience> Find(Experience experience);
        Task<Experience[][]> Find(int[] sessions);
    }

    public class ExperienceService : BaseService, IExperienceService
    {
        public ExperienceService(DatabaseContext context) : base(context)
        {
        }

        public async Task<Experience> Create(Experience experience)
        {
            if (await Find(experience) != null) return null;
            var result = await _context.Experiences.AddAsync(experience);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Experience> Find(Experience experience)
        {
            return await _context.Experiences.FirstOrDefaultAsync(x => x.Id == experience.Id);
        }

        public async Task<Experience[][]> Find(int[] sessions)
        {
            var actions = await _context.Experiences.Where(action => sessions.Contains(action.SessionId)).ToListAsync();
            return actions.GroupBy(a => a.SessionId)
                .Select(group => group.ToArray())
                .ToArray();
        }
    }
}