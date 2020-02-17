using System.Threading.Tasks;
using botwat.ch.Data;

namespace botwat.ch.Services
{
    public interface IOldSchoolAccountService
    {
        Task<OldSchoolAccount> Create(OldSchoolAccount oldSchoolAccount);
        Task<OldSchoolAccount> Find(OldSchoolAccount oldSchoolAccount);
    }

    public class OldSchoolAccountService : IOldSchoolAccountService
    {
        public Task<OldSchoolAccount> Create(OldSchoolAccount oldSchoolAccount)
        {
            throw new System.NotImplementedException();
        }

        public Task<OldSchoolAccount> Find(OldSchoolAccount oldSchoolAccount)
        {
            throw new System.NotImplementedException();
        }
    }
}