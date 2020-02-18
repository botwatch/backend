using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;

namespace botwat.ch.Services
{
    public class BaseService
    {
        protected readonly DatabaseContext _context;

        public BaseService(DatabaseContext context)
        {
            _context = context;
        }
    }
}