namespace CNO.Models.DTO
{
    public class LogDTO
    {
        public Guid Id { get; init; }
        public string Service { get; init; } = string.Empty;
        public string Level { get; init; } = "Info";
        public string Message { get; init; } = string.Empty;
        public DateTime Time { get; init; }
        public IReadOnlyDictionary<string, string>? Tags { get; init; }
    }
}
    