using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext dataContext)
        {
            this._context = dataContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Activity>> GetAtivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }


    }
}