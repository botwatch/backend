using System;
using System.Collections.Generic;
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
    public class BotClientController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;

        public BotClientController(ILogger<InteractionController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<BotClient>> Create(string name, string description, string url, string authors)
        {
            try
            {
                return await _service.BotClientService.Create(name, description,url, authors);
            }
            catch (DataException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception)
            {
                return BadRequest("Unable to create client!");
            }
        }
    }
}