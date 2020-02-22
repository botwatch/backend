using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Data.Transport.Request.Session;
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
        public async Task<ActionResult<Session>> Create([FromBody] SessionCreateRequest request) //TODO make DTO not include entire session 
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            var localClient = await _service.BotClientService.Find(request.ClientName);
            var localAccount = await _service.OldSchoolAccountService.Find(request.AccountAlias);
            if (localUser == null)
            {
                return NotFound($"User does not exist.");
            }

            if (localClient == null)
            {
                return NotFound($"{request.ClientName} does not exist.");
            }

            if (localAccount == null)
            {
                return NotFound($"{request.AccountAlias} does not exist.");
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