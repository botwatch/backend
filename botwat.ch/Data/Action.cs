using System;

namespace botwat.ch.Data
{
    public class Action
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public DateTime Time { get; set; }
        public int Param1 { get; set; }
        public int Param2 { get; set; }
        public int Param3 { get; set; }
        public int Identifier { get; set; }
        public int MenuOption { get; set; }
        public int MenuTarget { get; set; }
        public int MouseX { get; set; }
        public int MouseY { get; set; }
    }
}