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
    public class MouseController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;
        private readonly DatabaseContext _context;

        public MouseController(ILogger<InteractionController> logger, IServicesPool service, DatabaseContext ctx)
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
                        session.Start <= max &&
                        session.Start >= start
                    );

                    var actions = await _context.Interactions
                        .Where(action => sessions.Any(s => action.SessionId == s.Id))
                        .ToListAsync();

                    var mouseData = actions.Select(a => new {X = a.MouseX, Y = a.MouseY, Time = a.Time});

                    return Ok(mouseData);
                }

                return BadRequest("Unable to parse date.");
            }

            return BadRequest("No accounts for current user.");
        }
    }
}