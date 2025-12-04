using CNO.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CNO.Models.Logs;
namespace CNO.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : Controller
    {
        private readonly ILogService _logService;

        public LogsController(ILogService logService) {
            logService = _logService;
        }


        [HttpPost("/")]
        public async Task<IActionResult> CreateLog([FromBody] LogEntry logEntry)
        {
            await _logService.LogAsync(logEntry);
            return Ok();
        }

       

       
    }
}
