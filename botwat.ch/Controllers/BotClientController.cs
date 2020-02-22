using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using botwat.ch.Data.Transport.Request.Client;
using botwat.ch.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [HttpGet("/")]
        public IAsyncEnumerable<BotClient> GetAll()
        {
            return _service.BotClientService.FindAll();
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<BotClient>> Create([FromBody] BotClientCreateRequest request)
        {
            try
            {
                return await _service.BotClientService.Create(request);
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