using System.Text.Json;
using CNO.Models.Logs;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;
using CNO.Models.DTO;
using System.Collections.ObjectModel;

namespace CNO.Services.Logs
{
    public class LogService : ILogService
    {
        private readonly ILogsRepo _logRepo;

        public LogService(ILogsRepo logRepo)
        {
            _logRepo = logRepo;
        }

        public async Task LogAsync(LogEntry logEntry)
        {
            await _logRepo.AddLogAsync(logEntry);
        }

        public async Task<IEnumerable<LogDTO>> GetLogsAsync(string? service = null, string? level = null)
        {
            var logs = await _logRepo.GetLogsAsync(service, level);

            return logs.Select(l =>
            {
                IReadOnlyDictionary<string, string>? tags = null;

                if (!string.IsNullOrWhiteSpace(l.Labels))
                {
                    try
                    {
                        
                        var dict = JsonSerializer.Deserialize<Dictionary<string, string>>(l.Labels!);
                        if (dict != null && dict.Count > 0)
                        {
                            tags = new ReadOnlyDictionary<string, string>(dict);
                        }
                    }
                    catch (JsonException)
                    {
                    }
                }

                return new LogDTO
                {
                    Id = l.Id,
                    Service = l.Service,
                    Level = l.Level,
                    Message = l.Message,
                    Time = l.Time,
                    Tags = tags
                };
            });
        }
    }
}
