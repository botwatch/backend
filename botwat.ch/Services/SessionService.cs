using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
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
        void Update(Session session);
        IAsyncEnumerable<Session> All(User localUser);
    }

    public class SessionService : BaseService, ISessionService
    {
        public SessionService(DatabaseContext context) : base(context)
        {
            _activeTimer.Elapsed += async (_, __) =>
            {
                foreach (var pair in _activeSessions.Where(pair =>
                    DateTime.Now.Subtract(pair.Value).TotalMilliseconds >= Timeout))
                {
                    await End(pair.Key);
                }
            };
        }

        //10 minute timeout on session
        private const double Timeout = 600000;
        private readonly Dictionary<Session, DateTime> _activeSessions = new Dictionary<Session, DateTime>();
        private readonly Timer _activeTimer = new Timer(Timeout);

        public async Task<Session> Create(Session session)
        {
            if (await Find(session.Id) != null) return null;
            var result = await _context.Sessions.AddAsync(session);
            await _context.SaveChangesAsync();
            _activeSessions.Add(result.Entity, DateTime.Now);
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<Session> Find(int session)
        {
            return await _context.Sessions.FirstOrDefaultAsync(x => x.Id == session);
        }

        public async Task<Session> End(Session session)
        {
            if (session == null) return null;
            //End session
            _activeSessions.Remove(session);
            session.End = DateTime.Now;
            await _context.SaveChangesAsync();
            return session;
        }

        public void Update(Session session)
        {
            if (_activeSessions.ContainsKey(session))
                _activeSessions[session] = DateTime.Now;
        }

        public IAsyncEnumerable<Session> All(User localUser)
        {
            return _context.Sessions.Where(session => session.User.Id == localUser.Id)
                .Include(session => session.Account)
                .AsAsyncEnumerable();
        }
    }
}