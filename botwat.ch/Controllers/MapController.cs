using System;
using System.Collections.Generic;
using System.Drawing;
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
    public class MapController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;
        private readonly DatabaseContext _context;

        public MapController(ILogger<InteractionController> logger, IServicesPool service, DatabaseContext ctx)
        {
            _logger = logger;
            _service = service;
            _context = ctx;
        }

        [Authorize]
        [HttpPost("heatmap")]
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

                    var totalActions = _context.Interactions
                        .Where(action => sessions.Any(s => action.SessionId == s.Id))
                        .GroupBy(action => new Point(action.LocationX, action.LocationY)).Select(val => new
                        {
                            X = val.Key.X,
                            Y = val.Key.Y,
                            Z = val.Count()
                        });

                    return Ok(new
                    {
                        HeatMap = totalActions
                    });
                }

                return BadRequest("Unable to parse date.");
            }

            return BadRequest("No accounts for current user.");
        }
    }
}