using System;

namespace botwat.ch.Data
{
    public class OldSchoolAccount
    {
        public int Id { get; set; }
        public string Alias { get; set; }
        public User Owner { get; set; }
        public DateTime BanTime { get; set; }
    }
}