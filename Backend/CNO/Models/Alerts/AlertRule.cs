namespace CNO.Models.Alerts
{
    public class AlertRule
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string MetricName { get; set; } = string.Empty;
        public double Threshold { get; set; }
        public string Operator { get; set; } = ">";
        public int DurationMinutes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
