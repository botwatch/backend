using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IOldSchoolAccountService
    {
        Task<OldSchoolAccount> Create(OldSchoolAccount account);
        Task<OldSchoolAccount> Find(OldSchoolAccount account);
    }

    public class OldSchoolAccountService : BaseService,IOldSchoolAccountService
    {
        public OldSchoolAccountService(DatabaseContext context) : base(context)
        {
        }
        public async Task<OldSchoolAccount> Create(OldSchoolAccount account)
        {
            if (await Find(account) != null) return null;
            var result = await _context.Accounts.AddAsync(account);
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<OldSchoolAccount> Find(OldSchoolAccount account)
        {
            return await _context.Accounts.FirstOrDefaultAsync(
                x => x.Id == account.Id ||
                     x.Alias == account.Alias
            );
        }
    }
}