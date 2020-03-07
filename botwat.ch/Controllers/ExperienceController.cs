﻿using System;
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
    public class ExperienceController : ControllerBase
    {
        private readonly ILogger<InteractionController> _logger;
        private readonly IServicesPool _service;

        public ExperienceController(ILogger<InteractionController> logger, IServicesPool service)
        {
            _logger = logger;
            _service = service;
        }


        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<Experience>> Create([FromBody] Experience client)
        {
            if (_service.ExperienceService.Find(client) != null) return null;
            var localClient = new Experience
            {
                Occurred = DateTime.Now,
                Owner = client.Owner,
                SkillExperience = client.SkillExperience,
                SkillIndex = client.SkillIndex
            };

            return await _service.ExperienceService.Create(localClient);
        }
    }
}