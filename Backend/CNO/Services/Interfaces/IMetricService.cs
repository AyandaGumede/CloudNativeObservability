using CNO.Models.DTO;

namespace CNO.Services.Interfaces
{
    public interface IMetricService
    {
        Task AddMetricAsync(MetricDto metricDto);
        Task<IEnumerable<MetricDto>> GetMetricsAsync(string? service = null);
    }

}
