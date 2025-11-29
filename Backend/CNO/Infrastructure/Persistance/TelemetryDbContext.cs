using CNO.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CNO.Infrastructure.Persistance
{
    public class TelemetryDbContext : DbContext
    {
        public TelemetryDbContext(DbContextOptions<TelemetryDbContext> options)
            : base(options) { }

        public DbSet<Metric> Metrics { get; set; }
    }
}
