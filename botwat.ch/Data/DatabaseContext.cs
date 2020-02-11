using Microsoft.EntityFrameworkCore;

namespace botwat.ch.Data
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Action> Interactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
                "connectionString"
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           //Nothing yet but this will get a-lot of attention...
        }
    }
}