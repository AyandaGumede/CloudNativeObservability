using CNO.Models.Logs;

namespace CNO.Repository.Interfaces
{
    public interface ILogsRepo
    {
        Task AddLogAsync(LogEntry log);
        Task<IEnumerable<LogEntry>> GetLogsAsync(string? service = null, string? level = null, DateTime? from = null, DateTime? to = null);
        Task<LogEntry?> GetLogByIdAsync(Guid id);
    }
}
