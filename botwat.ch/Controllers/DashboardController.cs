using System;
using System.Linq;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace botwat.ch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;
        private readonly DatabaseContext _context;

        public DashboardController(ILogger<InteractionController> logger, IServicesPool service, DatabaseContext ctx)
        {
            _logger = logger;
            _service = service;
            _context = ctx;
        }

        [Authorize]
        [HttpPost("data")]
        public async Task<ActionResult<object>> Get(string startDay, int daySpan)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null)
            {
                if (DateTime.TryParse(startDay, out var start))
                {
                    var max = start.AddDays(daySpan);

                    var sessions = _context.Sessions.Where(session =>
                        session.User == localUser &&
                        session.Start <= max
                    );

                    var totalExp = _context.Experiences.Where(exp => sessions.Any(s => s.Id == exp.SessionId))
                        .ToList()
                        .GroupBy(exp => exp.SkillIndex)
                        .Select(group => group.OrderBy(exp => exp.SkillExperience))
                        .Sum(sorted => sorted.Last().SkillExperience - sorted.First().SkillExperience);

                    var totalActions = await _context.Interactions
                        .Where(action => sessions.Any(s => action.SessionId == s.Id))
                        .CountAsync();

                    var graph = sessions.ToList().GroupBy(session => session.Start.DayOfYear)
                        .ToDictionary(group => group.Key, group => group.Count());

                    //fill in missing days
                    var day = start.DayOfYear;
                    for (var i = day; i < day + daySpan; i++)
                        if (!graph.ContainsKey(i))
                            graph[i] = 0;

                    return Ok(new
                    {
                        Graph = graph
                            .OrderBy(g => g.Key)
                            .Select(v => new {Date = v.Key, Count = v.Value}),
                        TotalExp = totalExp,
                        TotalActions = totalActions
                    });
                }

                return BadRequest("Unable to parse date.");
            }

            return BadRequest("No accounts for current user.");
        }
    }
}