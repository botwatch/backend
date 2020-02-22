namespace botwat.ch.Data
{
    public class User
    {
        public int Id { get; set; }
        public string DiscordHandle { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string IpAddress { get; set; }
        public string Token { get; set; }
        public Permissions Permissions { get; set; }

        private User set_password(string password)
        {
            Password = password;
            return this;
        }

        private User set_ip(string ip)
        {
            IpAddress = ip;
            return this;
        }

        public User Safe() => ((User) MemberwiseClone()).set_password(null).set_ip(null);
    }
}