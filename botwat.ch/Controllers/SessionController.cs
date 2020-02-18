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
        public async Task<ActionResult<Session>>
            Create([FromBody] Session session) //TODO make DTO not include entire session 
        {
            var localUser = await _service.UserService.Find(session.User);
            var localClient = await _service.BotClientService.Find(session.Client);
            var localAccount = await _service.OldSchoolAccountService.Find(session.Account);
            if (localUser == null)
            {
                return NotFound($"{session.User} does not exist.");
            }

            if (localClient == null)
            {
                return NotFound($"{session.Client} does not exist.");
            }

            if (localAccount == null)
            {
                return NotFound($"{session.Account} does not exist.");
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