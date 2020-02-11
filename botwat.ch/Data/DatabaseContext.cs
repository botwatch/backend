using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace botwat.ch.Data
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Action> Interactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration.GetConnectionString("Master-Database");
            connectionString += Encoding.UTF8.GetString(
                new byte[] {46, 69, 72, 65, 53, 0x6e, 61, 69, 0x6c, 36, 37, 38, 21, 0x3b}
            );
            optionsBuilder.UseMySql(
                connectionString
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Nothing yet but this will get a-lot of attention...
        }
    }
}