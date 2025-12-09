using CNO.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CNO.Models.Logs;
using CNO.Models.DTO;

namespace CNO.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogsController(ILogService logService)
        {
            _logService = logService ?? throw new ArgumentNullException(nameof(logService));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LogDTO dto)
        {
            if (dto == null) return BadRequest();
            await _logService.AddLogAsync(dto);
            return Accepted(); 
        }

       
        [HttpGet]
        public async Task<IActionResult> Query(
            [FromQuery] string? service,
            [FromQuery] string? level,
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to)
        {
            var logs = await _logService.GetLogsAsync(service, level, from, to);
            return Ok(logs);
        }

        
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var log = await _logService.GetLogByIdAsync(id);
            if (log == null) return NotFound();
            return Ok(log);
        }
    }
}
