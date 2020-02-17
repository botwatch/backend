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
        private readonly DatabaseContext _context;
        private readonly IServicesPool _service;

        public SessionController(ILogger<InteractionController> logger, DatabaseContext context, IServicesPool service)
        {
            _context = context;
            _logger = logger;
            _service = service;
        }

        [HttpPost]
        public IActionResult Path([FromBody] Interaction interaction)
        {
            _context.Interactions.Add(interaction);
            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Out.WriteLine(e);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Session>> Create([FromBody] Session session) //TODO make DTO not include entire session 
        {
            //TODO infer user from JWT
            var localUser = await _service.UserService.Find(session.User);
            var localClient = await _service.BotClientService.Find(session.Client);
            var localAccount = await _service.OldSchoolAccountService.Find(session.Account);
            if (localUser == null)
            {
                return null;
            }
            else if (localClient == null)
            {
                return null;
            }
            else if (localAccount == null)
            {
                return null;
            }
            else
            {
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
}