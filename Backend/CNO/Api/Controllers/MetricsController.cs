using Microsoft.AspNetCore.Mvc;
using CNO.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using CNO.Infrastructure.Persistance;

namespace CNO.Api.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class MetricsController : ControllerBase
    {
        private readonly TelemetryDbContext _context;
        public MetricsController(TelemetryDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostMetric([FromBody] Metric metric)
        {
            _context.Metrics.Add(metric);
            await _context.SaveChangesAsync();
            return Ok(metric);
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest()
        {
            var latest = await _context.Metrics
                .OrderByDescending(m => m.Time)
                .Take(10)
                .ToListAsync();
            return Ok(latest);
        }
    }
}
