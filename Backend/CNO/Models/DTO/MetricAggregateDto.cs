namespace CNO.Models.DTO
{
    public sealed class MetricAggregateDto
    {
        public string MetricName { get; init; } = string.Empty;
        public DateTime From { get; init; }
        public DateTime To { get; init; }
        public double Min { get; init; }
        public double Max { get; init; }
        public double Avg { get; init; }
        public long Count { get; init; }
    }

}
