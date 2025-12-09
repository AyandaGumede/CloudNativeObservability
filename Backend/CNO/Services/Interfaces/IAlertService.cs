using CNO.Models.DTO;

namespace CNO.Services.Interfaces
{
    public interface IAlertService
    {
        Task CheckAlertsAsync(MetricDto metric);
    }
}
