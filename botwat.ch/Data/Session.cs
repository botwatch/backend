using System;

namespace botwat.ch.Data
{
    public class Session
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public User User { get; set; }
        public BotClient Client { get; set; }
        public OldSchoolAccount Account { get; set; }
    }
}