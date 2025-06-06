using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacientController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PacientController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("register")]
        public async Task<IActionResult> RegisterPacient([FromBody] RegisterPacient model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pacient = new RegisterPacient
            {
                Name = model.Name,
                
                BirthDate = model.BirthDate,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Address = model.Address,
                City = model.City
                

                
            };

            
            await _context.RegisterPacients.AddAsync(pacient);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Paciente registered successfully." });
        }
    }
}
