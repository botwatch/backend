namespace botwat.ch.Data.Transport.Response.User
{
    public struct UserCreateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DiscordHandle { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}