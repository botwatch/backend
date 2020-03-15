using System;
using System.Data;
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
        public async Task<ActionResult<User>> Authenticate(string name, string password)
        {
            try
            {
                var result = await _service.UserService.Authenticate(name, password, false);
                return Ok(result);
            }
            catch
            {
                return NotFound("Invalid Username or Password. Please try again.");
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(string name, string token)
        {
            try
            {
                var result = await _service.UserService.Authenticate(name, token);
                return Ok(result);
            }
            catch
            {
                return NotFound("Invalid Username or Password. Please try again.");
            }
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<ActionResult<User>> Create(string name, string email, string password)
        {
            try
            {
                return Ok(await _service.UserService.Create(name, email, password));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return BadRequest("User Creation Failed!");
            }
        }
    }
}