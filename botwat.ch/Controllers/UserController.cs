using System;
using System.Data;
using System.Threading.Tasks;
using botwat.ch.Data.Transport.Request.User;
using botwat.ch.Data.Transport.Response.User;
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
        public async Task<ActionResult<UserAuthenticateResponse>> Authenticate(
            [FromBody] UserAuthenticateRequest request)
        {
            try
            {
                var result = await _service.UserService.Authenticate(request);
                return Ok(result);
            }
            catch
            {
                return NotFound("Invalid Username or Password. Please try again.");
            }
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<ActionResult<UserCreateResponse>> Create([FromBody] UserCreateRequest request)
        {
            try
            {
                return Ok(await _service.UserService.Create(request));
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