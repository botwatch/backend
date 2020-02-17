using System.Threading.Tasks;
using botwat.ch.Data;

namespace botwat.ch.Services
{
    public interface IPermissionService
    {
        Task<Permissions> Create(Permissions permissions);
        Task<Permissions> Find(Permissions permissions);
    }

    public class PermissionService : IPermissionService
    {
        public Task<Permissions> Create(Permissions permissions)
        {
            throw new System.NotImplementedException();
        }

        public Task<Permissions> Find(Permissions permissions)
        {
            throw new System.NotImplementedException();
        }
    }
}