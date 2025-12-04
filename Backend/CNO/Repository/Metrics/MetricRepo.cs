using CNO.Data;
using CNO.Models.Metric;
using CNO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            var query = _context.Metrics.AsQueryable();
            if (!string.IsNullOrEmpty(service))
            {
                query = query.Where(m => m.Service == service);
            }
            return await query.ToListAsync();
        }
    }

}
