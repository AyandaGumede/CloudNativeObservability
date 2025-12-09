using CNO.Models.Auth;
using CNO.Models.Metric;
using CNO.Models.Logs;
using CNO.Models.Alerts;
using Microsoft.EntityFrameworkCore;

namespace CNO.Data
{
    public class TelemetryDbContext : DbContext
    {
        public TelemetryDbContext(DbContextOptions<TelemetryDbContext> options)
            : base(options) { }

        public DbSet<Login> Users{ get; set; }
        public DbSet<Metric> Metrics { get; set; }

        public DbSet<LogEntry> Logs { get; set; }

        public DbSet<AlertRule> AlertRules => Set<AlertRule>();


    }
}
