using CNO.Models.DTO;
using CNO.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MetricsController : ControllerBase
{
    private readonly IMetricService _metricService;

    public MetricsController(IMetricService metricService)
    {
        _metricService = metricService;
    }

    [HttpPost]
    public async Task<IActionResult> AddMetric([FromBody] MetricDto dto)
    {
        await _metricService.AddMetricAsync(dto);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetMetrics([FromQuery] string? service)
    {
        var metrics = await _metricService.GetMetricsAsync(service);
        return Ok(metrics);
    }
}
