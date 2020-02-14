namespace botwat.ch.Data.Internal
{
    public interface ICredentials
    {
        public string Name { get; set; }
        public string SaltedPassword { get; set; }
    }
}