using CNO.Models.Metric;
using CNO.Models.Logs;
using Microsoft.EntityFrameworkCore;

namespace CNO.Data
{
    public class TelemetryDbContext : DbContext
    {
        public TelemetryDbContext(DbContextOptions<TelemetryDbContext> options)
            : base(options) { }

        public DbSet<Metric> Metrics { get; set; }

        public DbSet<LogEntry> Logs { get; set; }
    }
}
