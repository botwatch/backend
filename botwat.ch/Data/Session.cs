using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
        [NotMapped] public bool IsActive => Start != DateTime.MinValue && End == DateTime.MinValue;
    }
}