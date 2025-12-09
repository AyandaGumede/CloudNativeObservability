using CNO.Models.Metric;

public interface IMetricRepository
{
    Task AddMetricAsync(Metric metric);
    Task<IEnumerable<Metric>> GetMetricsAsync(string? service = null);
    Task<Metric?> GetByIdAsync(Guid id);

    Task<(double Min, double Max, double Avg, long Count)> GetAggregatesAsync(string metricName, DateTime from, DateTime to);
}
