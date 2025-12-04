using CNO.Models.Logs;

namespace CNO.Repository.Interfaces
{
    public interface ILogsRepo
    {
        Task AddLogAsync(LogEntry log);
        Task<IEnumerable<LogEntry>> GetLogsAsync(string? service = null, string? level = null);
    }
}
