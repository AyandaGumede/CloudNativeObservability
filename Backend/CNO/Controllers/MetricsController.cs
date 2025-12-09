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

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var metric = await _metricService.GetMetricByIdAsync(id);
        if (metric == null) return NotFound();
        return Ok(metric);
    }

    [HttpGet("aggregate")]
    public async Task<IActionResult> Aggregate(
        [FromQuery] string metricName,
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to)
    {
        if (string.IsNullOrWhiteSpace(metricName))
            return BadRequest("metricName is required.");

        var rangeFrom = from ?? DateTime.UtcNow.AddHours(-1);
        var rangeTo = to ?? DateTime.UtcNow;

        var agg = await _metricService.GetAggregatesAsync(metricName, rangeFrom, rangeTo);
        return Ok(agg);
    }
}
