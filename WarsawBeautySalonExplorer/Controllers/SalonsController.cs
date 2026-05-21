using Microsoft.AspNetCore.Mvc;
using WarsawBeautySalonExplorer.DTOs;
using WarsawBeautySalonExplorer.Exceptions;
using WarsawBeautySalonExplorer.Services;

namespace WarsawBeautySalonExplorer.Controllers;

[ApiController]
[Route("api/salons")]
public class SalonsController(ISalonService service) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(service.GetAll());
    }
    
    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        try
        {
            return Ok(service.GetById(id));
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
    
    [HttpPut("{id}")]
    public IActionResult Update(string id, [FromBody] UpdateSalonRequest request)
    {
        try
        {
            service.Update(id, request);
            return NoContent();
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
}