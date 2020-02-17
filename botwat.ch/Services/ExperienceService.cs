using System.Threading.Tasks;
using botwat.ch.Data;

namespace botwat.ch.Services
{
    public interface IExperienceService
    {
        Task<Experience> Create(Experience experience);
        Task<Experience> Find(Experience experience);
    }

    public class ExperienceService : IExperienceService
    {
        public Task<Experience> Create(Experience experience)
        {
            throw new System.NotImplementedException();
        }

        public Task<Experience> Find(Experience experience)
        {
            throw new System.NotImplementedException();
        }
    }
}