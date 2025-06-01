using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public IActionResult GetProducts()
    {
        var products = new[] {
            new { Id = 1, Name = "Produto A", Price = 10 },
            new { Id = 2, Name = "Produto B", Price = 20 },
        };

        return Ok(products);
    }
}
