namespace botwat.ch.Data.Transport.Request.Client
{
    public class BotClientCreateRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string[] AuthorNames { get; set; }
    }
}