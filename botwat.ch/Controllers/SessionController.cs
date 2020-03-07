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

        public SessionController(ILogger<InteractionController> logger,  IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Session>> Create(string clientName, string aliasName) 
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            var localClient = await _service.BotClientService.Find(clientName);
            var localAccount = await _service.OldSchoolAccountService.Find(aliasName);
            if (localUser == null)
            {
                return NotFound($"User does not exist.");
            }

            if (localClient == null)
            {
                return NotFound($"{clientName} does not exist.");
            }

            if (localAccount == null)
            {
                return NotFound($"{aliasName} does not exist.");
            }

            var localSession = new Session
            {
                Id = 0,
                Start = DateTime.Now,
                Account = localAccount,
                Client = localClient,
                User = localUser
            };
            return await _service.SessionService.Create(localSession);
        }
    }
}