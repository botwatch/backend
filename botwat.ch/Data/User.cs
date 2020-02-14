using botwat.ch.Data.Internal;

namespace botwat.ch.Data
{
    public class User : ICredentials
    {
        public int Id { get; set; }
        public string DiscordHandle { get; set; }
        public string Name { get; set; }
        public string SaltedPassword { get; set; }
        public string Token { get; set; }
        public Permissions Permissions { get; set; }
    }
}