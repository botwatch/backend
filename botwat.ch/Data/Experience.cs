using System;

namespace botwat.ch.Data
{
    public class Experience
    {
        public OldSchoolAccount Owner { get; set; }
        
        public Session Session { get; set; }
        public DateTime Occurred { get; set; }
        
        public int SkillIndex { get; set; }
        public int SkillExperience { get; set; }
    }
}