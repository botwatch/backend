using System;

namespace botwat.ch.Data
{
    public class Experience
    {
        public int Id { get; set; }
        public OldSchoolAccount Owner { get; set; }
        
        public int SessionId { get; set; }
        public DateTime Occurred { get; set; }
        
        public int SkillIndex { get; set; }
        public int SkillExperience { get; set; }
    }
}