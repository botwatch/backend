using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Data
{
    public static class DbProvider
    {
        private static DatabaseContext _context;
        public static DatabaseContext Context => _context ??= new DatabaseContext();
    }
}