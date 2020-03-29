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
    public class InteractionController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;

        public InteractionController(ILogger<InteractionController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize]
        [HttpPost("get")]
        public async Task<ActionResult<Interaction[][]>> Get([FromBody] int[] ids)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null) return Ok(await _service.InteractionService.Find(ids));
            return BadRequest("No accounts for current user.");
        }


        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Interaction>> Create(int param1, int param2, int param3, int identifier,
            int menuOption, int menuTarget, int mouseX, int mouseY, int locationX, int locationY, int sessionId)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            var session = await _service.SessionService.Find(sessionId);

            if (localUser == null) return Forbid("Must be logged in to a valid user");
            if (session == null) return BadRequest("Must have valid session to track interactions");
            if (session.User != localUser) return Forbid("You do not own this session");
            if(!session.IsActive) return Forbid("This session has already ended. Start a new session.");

            var interaction = new Interaction
            {
                Time = DateTime.Now,
                Param1 = param1,
                Param2 = param2,
                Param3 = param3,
                Identifier = identifier,
                MenuOption = menuOption,
                MenuTarget = menuTarget,
                MouseX = mouseX,
                MouseY = mouseY,
                LocationX = locationX,
                LocationY = locationY,
                SessionId = session.Id
            };
            
            //update the session
            _service.SessionService.Update(session);

            return await _service.InteractionService.Create(interaction);
        }
    }
}