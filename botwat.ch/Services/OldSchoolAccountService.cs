using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Data.Transport.Request.Account;
using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Services
{
    public interface IOldSchoolAccountService
    {
        Task<OldSchoolAccount> Create(OldSchoolAccountCreateRequest request, User owner);
        Task<OldSchoolAccount> Find(string alias);
    }

    public class OldSchoolAccountService : BaseService, IOldSchoolAccountService
    {
        public OldSchoolAccountService(DatabaseContext context) : base(context)
        {
        }
        
        public async Task<OldSchoolAccount> Create(OldSchoolAccountCreateRequest request, User owner)
        {
            if (await Find(request.Alias) != null) return null;
            var account = new OldSchoolAccount {Alias = request.Alias, Owner = owner};
            var result = await _context.Accounts.AddAsync(account);
            return result.IsKeySet ? result.Entity : null;
        }

        public async Task<OldSchoolAccount> Find(string alias)
        {
            return await _context.Accounts.FirstOrDefaultAsync(
                x =>  x.Alias == alias
            );
        }
    }
}