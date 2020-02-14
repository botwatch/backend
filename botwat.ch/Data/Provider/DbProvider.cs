namespace botwat.ch.Data.Provider
{
    public static class DbProvider
    {
        private static DatabaseContext _context;
        public static DatabaseContext Context => _context ??= new DatabaseContext();
    }
}