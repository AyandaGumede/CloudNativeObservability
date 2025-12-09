using CNO.Models.DTO;
using CNO.Models.Metric;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;
using System.Text.Json;

namespace CNO.Services.Metrics
{
    public class MetricService : IMetricService
    {
        private readonly IMetricRepository _repository;

        public MetricService(IMetricRepository repository)
        {
            _repository = repository;
        }

        public async Task AddMetricAsync(MetricDto dto)
        {
            var metric = new Metric
            {
                Id = dto.Id != Guid.Empty ? dto.Id : Guid.NewGuid(),
                Service = dto.Service,
                InstanceId = System.Environment.MachineName,
                MetricName = dto.MetricName,
                Value = dto.Value,
                Time = dto.Time,
                Labels = dto.Tags is not null ? JsonSerializer.Serialize(dto.Tags) : "{}"
            };
            await _repository.AddMetricAsync(metric);
        }

        public async Task<IEnumerable<MetricDto>> GetMetricsAsync(string? service = null)
        {
            var metrics = await _repository.GetMetricsAsync(service);
            return metrics.Select(m => new MetricDto
            {
                Id = m.Id,
                Service = m.Service,
                MetricName = m.MetricName,
                Value = m.Value,
                Time = m.Time,
                Tags = m.Labels != null ? JsonSerializer.Deserialize<Dictionary<string, string>>(m.Labels) : null
            });
        }

        public async Task<MetricDto?> GetMetricByIdAsync(Guid id)
        {
            var m = await _repository.GetByIdAsync(id);
            if (m == null) return null;

            IReadOnlyDictionary<string, string>? tags = null;
            if (!string.IsNullOrWhiteSpace(m.Labels))
            {
                try
                {
                    var dict = JsonSerializer.Deserialize<Dictionary<string, string>>(m.Labels);
                    if (dict != null) tags = new Dictionary<string, string>(dict);
                }
                catch { }
            }

            return new MetricDto
            {
                Id = m.Id,
                Service = m.Service,
                MetricName = m.MetricName,
                Value = m.Value,
                Time = m.Time,
                Tags = tags
            };
        }

        public async Task<MetricAggregateDto> GetAggregatesAsync(string metricName, DateTime from, DateTime to)
        {
            var result = await _repository.GetAggregatesAsync(metricName, from, to);
            return new MetricAggregateDto
            {
                MetricName = metricName,
                From = from,
                To = to,
                Min = result.Min,
                Max = result.Max,
                Avg = result.Avg,
                Count = result.Count
            };
        }
    }

}
