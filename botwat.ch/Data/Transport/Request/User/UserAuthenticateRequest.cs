namespace botwat.ch.Data.Transport.Request.User
{
    public struct UserAuthenticateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DiscordHandle { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}