using CNO.Models.Alerts;

namespace CNO.Repository.Interfaces
{
    public interface IAlertRuleRepository
    {
        Task<List<AlertRule>> GetAllAsync();
        Task<AlertRule?> GetByIdAsync(Guid id);
        Task AddAsync(AlertRule rule);
        Task UpdateAsync(AlertRule rule);
        Task DeleteAsync(Guid id);
    }
}
