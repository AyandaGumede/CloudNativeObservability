using CNO.Models.DTO;
using CNO.Models.Metric;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;
using System.Text.Json;

namespace CNO.Services
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
                MetricName = dto.MetricName,
                Value = dto.Value,
                Time = dto.Time,
                Labels = dto.Tags is not null ? JsonSerializer.Serialize(dto.Tags) : null
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
    }

}
