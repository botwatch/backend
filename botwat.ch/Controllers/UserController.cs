using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Internal;
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
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _service;
        private readonly DatabaseContext _context;

        public UserController(ILogger<UserController> logger, IUserService service, DatabaseContext context)
        {
            _context = context;
            _logger = logger;
            _service = service;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate([FromBody] User user)
        {
            var result = await _service.Authenticate(user);
            if (result != null)
                return Ok(result);
            return NotFound(user.Name);
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<ActionResult<User>> Create([FromBody] User credentials)
        {
            var result = await _service.Create(credentials);
            if (result != null)
                return Ok(result);
            return BadRequest(credentials);
        }

        [HttpGet]
        public IAsyncEnumerable<User> Get() => _context.Users.AsAsyncEnumerable();
    }
}