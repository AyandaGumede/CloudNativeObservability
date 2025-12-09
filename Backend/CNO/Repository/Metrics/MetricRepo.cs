using Microsoft.EntityFrameworkCore;
using CNO.Data;
using CNO.Models.Metric;

namespace CNO.Repository.Metrics
{
    public class MetricRepository : IMetricRepository
    {
        private readonly TelemetryDbContext _context;

        public MetricRepository(TelemetryDbContext context)
        {
            _context = context;
        }

        public async Task AddMetricAsync(Metric metric)
        {
            await _context.Metrics.AddAsync(metric);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Metric>> GetMetricsAsync(string? service = null)
        {
            var q = _context.Metrics.AsQueryable();
            if (!string.IsNullOrEmpty(service)) q = q.Where(m => m.Service == service);
            return await q.OrderByDescending(m => m.Time).ToListAsync();
        }

        public async Task<Metric?> GetByIdAsync(Guid id)
        {
            return await _context.Metrics.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<(double Min, double Max, double Avg, long Count)> GetAggregatesAsync(string metricName, DateTime from, DateTime to)
        {
            var q = _context.Metrics
                .Where(m => m.MetricName == metricName && m.Time >= from && m.Time <= to);

            var count = await q.LongCountAsync();
            if (count == 0) return (0, 0, 0, 0);

            var min = await q.MinAsync(m => m.Value);
            var max = await q.MaxAsync(m => m.Value);
            var avg = await q.AverageAsync(m => m.Value);

            return (min, max, avg, count);
        }
    }

}