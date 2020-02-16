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
    public class SessionController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly DatabaseContext _context;
        public SessionController(ILogger<InteractionController> logger, DatabaseContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Path([FromBody] Interaction interaction)
        {
            _context.Interactions.Add(interaction);
            try
            {
               _context.SaveChanges();
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
            return await _context.Interactions.FirstAsync(action => action.Id == id);
        }

        [HttpGet]
        public IAsyncEnumerable<Interaction> Get() => _context.Interactions.AsAsyncEnumerable();
    }
}