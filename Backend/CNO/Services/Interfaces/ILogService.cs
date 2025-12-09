using CNO.Models.DTO;

namespace CNO.Services.Interfaces
{
    public interface ILogService
    {
        Task AddLogAsync(LogDTO dto);
        Task<IEnumerable<LogDTO>> GetLogsAsync(string? service = null, string? level = null, DateTime? from = null, DateTime? to = null);
        Task<LogDTO?> GetLogByIdAsync(Guid id);
    }
}
