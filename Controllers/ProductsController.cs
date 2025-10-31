using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EstoqueApi.Data;
using EstoqueApi.Models;

namespace EstoqueApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll([FromQuery] string? name)
    {
        var query = _db.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
            query = query.Where(p => p.Name.Contains(name));

        return Ok(await query.ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _db.Products.FindAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product p)
    {
        if (await _db.Products.AnyAsync(x => x.Name == p.Name))
            return Conflict(new { error = "Já existe produto com esse nome." });

        _db.Products.Add(p);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Product p)
    {
        if (id != p.Id) return BadRequest();

        if (await _db.Products.AnyAsync(x => x.Name == p.Name && x.Id != id))
            return Conflict(new { error = "Nome já cadastrado em outro produto." });

        _db.Entry(p).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
