using System.Collections.Generic;

namespace botwat.ch.Data
{
    public class Permissions
    {
        /// <summary>
        /// Shares the permission owner's data with the users in this list.
        /// Leaving this empty will indicate full privacy.
        /// </summary>
        public List<User> ShareUsers { get; set; }
    }
}