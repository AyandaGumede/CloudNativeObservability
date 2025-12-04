namespace CNO.Models.Logs
{
    public class LogEntry
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Service { get; set; } = string.Empty;
        public string InstanceId { get; set; } = string.Empty;
        public string Level { get; set; } = "Info"; 
        public string Message { get; set; } = string.Empty;
        public DateTime Time { get; set; } = DateTime.UtcNow;
        public string? Labels { get; set; } 
    }
}
