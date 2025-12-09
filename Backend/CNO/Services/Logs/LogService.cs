using System.Text.Json;
using System.Collections.ObjectModel;
using CNO.Models.Logs;
using CNO.Models.DTO;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;

namespace CNO.Services.Logs
{
    public class LogService : ILogService
    {
        private readonly ILogsRepo _logRepo;

        public LogService(ILogsRepo logRepo)
        {
            _logRepo = logRepo;
        }

        public async Task AddLogAsync(LogDTO dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            var labelsJson = string.Empty;
            if (dto.Tags is not null && dto.Tags.Count > 0)
            {
                labelsJson = JsonSerializer.Serialize(dto.Tags);
            }

            var entity = new LogEntry
            {
                Id = dto.Id == Guid.Empty ? Guid.NewGuid() : dto.Id,
                Service = dto.Service,
                Level = dto.Level,
                Message = dto.Message,
                Time = dto.Time == default ? DateTime.UtcNow : dto.Time,
                Labels = labelsJson
            };

            await _logRepo.AddLogAsync(entity);
        }

        public async Task<IEnumerable<LogDTO>> GetLogsAsync(string? service = null, string? level = null, DateTime? from = null, DateTime? to = null)
        {
            var logs = await _logRepo.GetLogsAsync(service, level, from, to);

            var result = logs.Select(l =>
            {
                IReadOnlyDictionary<string, string>? tags = null;
                if (!string.IsNullOrWhiteSpace(l.Labels))
                {
                    try
                    {
                        var dict = JsonSerializer.Deserialize<Dictionary<string, string>>(l.Labels!);
                        if (dict != null && dict.Count > 0) tags = new ReadOnlyDictionary<string, string>(dict);
                    }
                    catch (JsonException) { }
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

            return result;
        }

        public async Task<LogDTO?> GetLogByIdAsync(Guid id)
        {
            var entity = await _logRepo.GetLogByIdAsync(id);
            if (entity == null) return null;

            IReadOnlyDictionary<string, string>? tags = null;
            if (!string.IsNullOrWhiteSpace(entity.Labels))
            {
                try
                {
                    var dict = JsonSerializer.Deserialize<Dictionary<string, string>>(entity.Labels!);
                    if (dict != null && dict.Count > 0) tags = new ReadOnlyDictionary<string, string>(dict);
                }
                catch (JsonException) { }
            }

            return new LogDTO
            {
                Id = entity.Id,
                Service = entity.Service,
                Level = entity.Level,
                Message = entity.Message,
                Time = entity.Time,
                Tags = tags
            };
        }
    }
}
