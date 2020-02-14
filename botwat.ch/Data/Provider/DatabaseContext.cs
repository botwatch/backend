using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace botwat.ch.Data.Provider
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Interaction> Interactions { get; set; }
        public DbSet<BotClient> BotClients { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<OldSchoolAccount> Accounts { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration.GetConnectionString("Master-Database");
            connectionString += Encoding.UTF8.GetString(
                new byte[] {70, 105, 114, 101, 83, 110, 97, 105, 108, 54, 55, 56, 33, 59}
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