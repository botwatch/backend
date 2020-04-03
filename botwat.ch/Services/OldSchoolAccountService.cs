using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IOldSchoolAccountService
    {
        Task<OldSchoolAccount> Create(string request, User owner);
        Task<OldSchoolAccount> Find(string alias, User owner);
        IAsyncEnumerable<OldSchoolAccount> All();
        IAsyncEnumerable<OldSchoolAccount> All(User user);
        Task<OldSchoolAccount> SetBan(OldSchoolAccount account, User owner);
    }

    public class OldSchoolAccountService : BaseService, IOldSchoolAccountService
    {
        public OldSchoolAccountService(DatabaseContext context) : base(context)
        {
        }

        public async Task<OldSchoolAccount> Create(string alias, User owner)
        {
            if (await Find(alias, owner) != null) return null;
            var account = new OldSchoolAccount {Alias = alias, Owner = owner};
            var result = await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<OldSchoolAccount> Find(string alias, User owner)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(
                x => x.Alias == alias
            );
            return account?.Owner == owner ? account : null;
        }

        public IAsyncEnumerable<OldSchoolAccount> All(User user)
        {
            return _context.Accounts.Where(acc => acc.Owner.Id == user.Id).AsAsyncEnumerable();
        }

        public async Task<OldSchoolAccount> SetBan(OldSchoolAccount account, User owner)
        {
            if (account.Owner == owner)
            {
                account.BanTime = DateTime.Now;
                _context.Update(account);
                await _context.SaveChangesAsync();
            }

            return account;
        }

        public IAsyncEnumerable<OldSchoolAccount> All()
        {
            return _context.Accounts.AsAsyncEnumerable();
        }
    }
}