using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface ISessionService
    {
        Task<Session> Create(Session session);
        Task<Session> Find(int session);
        Task<Session> End(Session session);
        IAsyncEnumerable<Session> All(User localUser);
    }

    public class SessionService : BaseService, ISessionService
    {
        public SessionService(DatabaseContext context) : base(context)
        {
        }

        public async Task<Session> Create(Session session)
        {
            if (await Find(session.Id) != null) return null;
            var result = await _context.Sessions.AddAsync(session);
            await _context.SaveChangesAsync();
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<Session> Find(int session)
        {
            return await _context.Sessions.FirstOrDefaultAsync(x => x.Id == session);
        }

        public async Task<Session> End(Session session)
        {
            var validSession = await Find(session.Id);
            if (validSession == null) return null;
            //End session
            validSession.End = DateTime.Now;
            await _context.SaveChangesAsync();
            return validSession;
        }

        public IAsyncEnumerable<Session> All(User localUser)
        {
            return _context.Sessions.Where(session => session.User.Id == localUser.Id)
                .Include(session => session.Account)
                .AsAsyncEnumerable();
        }
    }
}