namespace botwat.ch.Data.Transport.Request.User
{
    public struct UserCreateRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string DiscordHandle { get; set; }
        public string Email { get; set; }
    }
}