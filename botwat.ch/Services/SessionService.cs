using System;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface ISessionService
    {
        Task<Session> Create(Session session);
        Task<Session> Find(Session session);
        Task<Session> End(Session session);
    }

    public class SessionService : BaseService, ISessionService
    {
        public SessionService(DatabaseContext context) : base(context)
        {
        }

        public async Task<Session> Create(Session session)
        {
            if (await Find(session) != null) return null;
            var result = await _context.Sessions.AddAsync(session);
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<Session> Find(Session session)
        {
            return await _context.Sessions.FirstOrDefaultAsync(x => x.Id == session.Id);
        }

        public async Task<Session> End(Session session)
        {
            var validSession = await Find(session);
            if (validSession == null) return null;
            //End session
            validSession.End = DateTime.Now;
            await _context.SaveChangesAsync();
            return validSession;
        }
    }
}