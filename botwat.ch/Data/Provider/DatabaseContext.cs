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

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Nothing yet but this will get a-lot of attention...
        }
    }
}