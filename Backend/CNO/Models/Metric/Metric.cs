namespace CNO.Models.Metric
{
    public class Metric
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Service { get; set; }
        public required string InstanceId { get; set; }
        public required string MetricName { get; set; }
        public double Value { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;

        public required string? Labels { get; set; }
    }
}