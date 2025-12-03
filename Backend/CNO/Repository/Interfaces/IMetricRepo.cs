using CNO.Models.Metric;

namespace CNO.Repository.Interfaces
{
    public interface IMetricRepository
    {
        Task AddMetricAsync(Metric metric);
        Task<IEnumerable<Metric>> GetMetricsAsync(string? service = null);
    }

}
