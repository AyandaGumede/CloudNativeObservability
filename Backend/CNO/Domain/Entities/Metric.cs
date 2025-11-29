namespace CNO.Domain.Entities
{
    public class Metric
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Service { get; set; }
        public string InstanceId { get; set; }
        public string MetricName { get; set; }
        public double Value { get; set; }
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public string Labels { get; set; }
    }
}
