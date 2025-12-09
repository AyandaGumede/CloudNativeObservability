using CNO.Models.DTO;

public interface IMetricService
{
    Task AddMetricAsync(MetricDto dto);
    Task<IEnumerable<MetricDto>> GetMetricsAsync(string? service = null);
    Task<MetricDto?> GetMetricByIdAsync(Guid id);
    Task<MetricAggregateDto> GetAggregatesAsync(string metricName, DateTime from, DateTime to);
}
