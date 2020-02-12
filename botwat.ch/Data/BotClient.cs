using System;
using System.Collections.Generic;

namespace botwat.ch.Data
{
    public class BotClient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public List<User> Authors { get; set; }
        public DateTime Created { get; set; }
    }
}