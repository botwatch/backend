using System.Threading.Tasks;
using botwat.ch.Data;

namespace botwat.ch.Services
{
    public interface ISessionService
    {
        Task<Session> Create(Session session);
        Task<Session> Find(Session session);
        Task<Session> End(Session session);
    }

    public class SessionService : ISessionService
    {
        public Task<Session> Create(Session session)
        {
            throw new System.NotImplementedException();
        }

        public Task<Session> Find(Session session)
        {
            throw new System.NotImplementedException();
        }

        public Task<Session> End(Session session)
        {
            throw new System.NotImplementedException();
        }
    }
}