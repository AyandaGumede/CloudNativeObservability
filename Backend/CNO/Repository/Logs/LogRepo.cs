using Microsoft.EntityFrameworkCore;
using CNO.Data;
using CNO.Models.Logs;
using CNO.Repository.Interfaces;

namespace CNO.Repository.Logs
{
    public class LogRepo : ILogsRepo
    {
        private readonly TelemetryDbContext _context;

        public LogRepo(TelemetryDbContext context)
        {
            _context = context;
        }

        public async Task AddLogAsync(LogEntry log)
        {
            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<LogEntry>> GetLogsAsync(string? service = null, string? level = null, DateTime? from = null, DateTime? to = null)
        {
            var query = _context.Logs.AsQueryable();

            if (!string.IsNullOrEmpty(service))
                query = query.Where(l => l.Service == service);

            if (!string.IsNullOrEmpty(level))
                query = query.Where(l => l.Level == level);

            if (from.HasValue)
                query = query.Where(l => l.Time >= from.Value);

            if (to.HasValue)
                query = query.Where(l => l.Time <= to.Value);

            return await query.OrderByDescending(l => l.Time).ToListAsync();
        }

        public async Task<LogEntry?> GetLogByIdAsync(Guid id)
        {
            return await _context.Logs.AsNoTracking().FirstOrDefaultAsync(l => l.Id == id);
        }
    }
}
