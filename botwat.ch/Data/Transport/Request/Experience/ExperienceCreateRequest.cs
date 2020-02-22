namespace botwat.ch.Data.Transport.Request.Experience
{
    public class ExperienceCreateRequest
    {
        public string AccountAlias { get; set; }
        public string BotClientName { get; set; }
        public int SessionId { get; set; }
        public int SkillIndex { get; set; }
        public int SkillExperience { get; set; }
    }
}