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
        
        [HttpGet]
        public IAsyncEnumerable<OldSchoolAccount> Get() => _service.OldSchoolAccountService.All();

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<OldSchoolAccount>> Create(string alias)
        {
            var name = "test";//User.Identity.Name;
            var localUser = await _service.UserService.Find(name);
            if (localUser != null)
                return await _service.OldSchoolAccountService.Create(alias, localUser);
            return BadRequest("User does not exist");
        }
    }
}