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
        private readonly IServicesPool _service;

        public UserController(ILogger<UserController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate([FromBody] User user)
        {
            var result = await _service.UserService.Authenticate(user);
            if (result != null)
                return Ok(result);
            return NotFound("Invalid Username or Password. Please try again.");
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<ActionResult<User>> Create([FromBody] User credentials)
        {
            try
            {
                return Ok(await _service.UserService.Create(credentials));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}