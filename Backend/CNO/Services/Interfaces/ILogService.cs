using CNO.Models.DTO;
using CNO.Models.Logs;

namespace CNO.Services.Interfaces
{
    public interface ILogService
    {
        public Task LogAsync(LogEntry logEntry);

        public Task<IEnumerable<LogDTO>> GetLogsAsync(string? service = null, string? level = null);
    }
}
