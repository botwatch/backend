using System;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace botwat.ch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SessionController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;

        public SessionController(ILogger<InteractionController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize]
        [HttpPost("all")]
        public async Task<ActionResult<Session>> Get()
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null) return Ok(_service.SessionService.All(localUser));
            return BadRequest("No accounts for current user.");
        }

        [Authorize]
        [HttpPost("end")]
        public async Task<ActionResult<Session>> End(int sessionId)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser == null) return BadRequest("No accounts for current user.");
            var session = await _service.SessionService.Find(sessionId);
            if (session != null)
            {
                return Ok(await _service.SessionService.End(session));
            }
            return BadRequest($"Session id {sessionId} does not exist.");

        }


        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Session>> Create(string client, string alias)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            var localClient = await _service.BotClientService.Find(client);
            var localAccount = await _service.OldSchoolAccountService.Find(alias);
            if (localUser == null)
            {
                return NotFound($"User does not exist.");
            }

            if (localClient == null)
            {
                return NotFound($"{client} does not exist.");
            }

            if (localAccount == null)
            {
                return NotFound($"{alias} does not exist.");
            }

            var localSession = new Session
            {
                Id = 0,
                Start = DateTime.Now,
                Account = localAccount,
                Client = localClient,
                User = localUser
            };
            var result = await _service.SessionService.Create(localSession);
            if (result != null) return Ok(result);
            return BadRequest("UNKNOWN FAILURE CREATING SESSION");
        }
    }
}