using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace botwat.ch.Controllers
{
    [ApiController]
    [Route("account")]
    public class OldSchoolAccountController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;

        public OldSchoolAccountController(ILogger<InteractionController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize]
        [HttpPost("all")]
        public async Task<ActionResult<OldSchoolAccount>> Get()
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null) return Ok(_service.OldSchoolAccountService.All(localUser));
            return BadRequest("No accounts for current user.");
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<OldSchoolAccount>> Create(string alias)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null)
                return await _service.OldSchoolAccountService.Create(alias, localUser);
            return BadRequest("User does not exist or Account already exists");
        }
        
        [Authorize]
        [HttpPost("banned")]
        public async Task<ActionResult<OldSchoolAccount>> Banned(string alias)
        {
            var name = User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null)
            {
                var account = await _service.OldSchoolAccountService.Find(alias);
                if (account != null)
                {
                    return await _service.OldSchoolAccountService.SetBan(account);
                }
            }
            return BadRequest("User does not exist or Account does not exist");
        }
    }
}