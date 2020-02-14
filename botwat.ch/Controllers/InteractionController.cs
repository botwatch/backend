using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using botwat.ch.Data;
using botwat.ch.Data.Provider;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace botwat.ch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InteractionController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;

        public InteractionController(ILogger<InteractionController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Path([FromBody] Interaction interaction)
        {
            DbProvider.Context.Interactions.Add(interaction);
            try
            {
                DbProvider.Context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Out.WriteLine(e);
            }

            return Ok();
        }


        [HttpGet("{id}")]
        public async Task<Interaction> ForId(int id)
        {
            return await DbProvider.Context.Interactions.FirstAsync(action => action.Id == id);
        }

        [HttpGet]
        public IAsyncEnumerable<Interaction> Get() => DbProvider.Context.Interactions.AsAsyncEnumerable();
    }
}