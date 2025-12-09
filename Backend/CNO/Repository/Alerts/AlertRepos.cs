using CNO.Repository.Interfaces;
using CNO.Data;
using CNO.Models.Alerts;
using Microsoft.EntityFrameworkCore;


namespace CNO.Repository.Alerts
{
    public class AlertRepos : IAlertRuleRepository
    {
        private readonly TelemetryDbContext _context;

        public AlertRepos(TelemetryDbContext context)
        {
            _context = context;
        }

        public async Task<List<AlertRule>> GetAllAsync() => await _context.AlertRules.ToListAsync();
        public async Task<AlertRule?> GetByIdAsync(Guid id) => await _context.AlertRules.FindAsync(id);
        public async Task AddAsync(AlertRule rule) { _context.AlertRules.Add(rule); await _context.SaveChangesAsync(); }
        public async Task UpdateAsync(AlertRule rule) { _context.AlertRules.Update(rule); await _context.SaveChangesAsync(); }
        public async Task DeleteAsync(Guid id)
        {
            var entity = await _context.AlertRules.FindAsync(id);
            if (entity != null) { _context.AlertRules.Remove(entity); await _context.SaveChangesAsync(); }
        }
    }
}
