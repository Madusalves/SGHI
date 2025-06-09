using Backend.Models;
using Backend.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Backend.DTO;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<LoginModel> _userManager;
        private readonly SignInManager<LoginModel> _signInManager;

        public LoginController(UserManager<LoginModel> userManager, SignInManager<LoginModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new LoginModel
            {
                UserName = request.UserName,
                Email = request.Email,
                Name = request.Name
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
                return Ok("User registered successfully!");

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(
                request.UserName, request.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
                return Ok("Login successful!");

            return Unauthorized("User or password is incorrect.");
        }
    }
}
