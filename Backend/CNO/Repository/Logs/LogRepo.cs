using CNO.Data;
using CNO.Models.Logs;
using CNO.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<LogEntry>> GetLogsAsync(string? service = null, string? level = null)
        {
            var query = _context.Logs.AsQueryable();

            if (!string.IsNullOrEmpty(service))
                query = query.Where(l => l.Service == service);

            if (!string.IsNullOrEmpty(level))
                query = query.Where(l => l.Level == level);

            return await query.ToListAsync();
        }
    }
}
