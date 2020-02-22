namespace botwat.ch.Data.Transport.Request
{
    public interface ISessionCreateRequest
    {
        public string ClientName { get; set; }
        public string AccountAlias { get; set; }
    }
}