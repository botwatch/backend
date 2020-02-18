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
        public async Task<ActionResult<BotClient>> Create([FromBody] BotClient client)
        {
            if (_service.BotClientService.Find(client) != null) return null;
            var localClient = new BotClient
            {
                Created = DateTime.Now, Name = client.Name, Description = client.Description, Url = client.Url
            };
            return await _service.BotClientService.Create(localClient);
        }
    }
}