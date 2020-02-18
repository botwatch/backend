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
        [HttpPost("create")]
        public async Task<ActionResult<OldSchoolAccount>> Create([FromBody] OldSchoolAccount account)
        {
            if (_service.OldSchoolAccountService.Find(account) != null) return null;
            var localAccount = new OldSchoolAccount {Alias = account.Alias, Owner = account.Owner, Banned = false};
            return await _service.OldSchoolAccountService.Create(localAccount);
        }
    }
}