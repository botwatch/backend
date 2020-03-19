using System;
using System.Collections.Generic;
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
    public class ExperienceController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;

        public ExperienceController(ILogger<InteractionController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }


        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Experience>> Create(int skillIndex, int experience, int sessionId)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            var session = await _service.SessionService.Find(sessionId);
            
            if (localUser == null) return Forbid("Must be logged in to a valid user");
            if (session == null) return BadRequest("Must have valid session to track experience");
            if (session.User != localUser) return Forbid("You do not own this session");
            
            var localClient = new Experience
            {
                Occurred = DateTime.Now,
                Owner = session.Account,
                SessionId = sessionId,
                SkillExperience = experience,
                SkillIndex = skillIndex
            };

            return await _service.ExperienceService.Create(localClient);
        }
    }
}