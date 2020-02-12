namespace botwat.ch.Data
{
    public class User
    {
        public int Id { get; set; }
        public string DiscordHandle { get; set; }
        public string Name { get; set; }
        public Permissions Permissions { get; set; }
    }
}