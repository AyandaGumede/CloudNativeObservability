using Microsoft.AspNetCore.Mvc;

namespace CNO.Models.DTO
{
    public sealed class MetricDto
    {
        public Guid Id { get; init; }
        public string Service { get; init; } = string.Empty;
        public string MetricName { get; init; } = string.Empty;
        public double Value { get; init; }
        public DateTime Time { get; init; }
        public IReadOnlyDictionary<string, string>? Tags { get; init; } 
    }


}
