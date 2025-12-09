using CNO.Models.DTO;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;

namespace CNO.Services.Alert
{
    public class AlertService : IAlertService
    {
        private readonly IAlertRuleRepository _repo;

        public AlertService(IAlertRuleRepository repo) => _repo = repo;

        public async Task CheckAlertsAsync(MetricDto metric)
        {
            var rules = await _repo.GetAllAsync();
            foreach (var rule in rules.Where(r => r.IsActive && r.MetricName == metric.MetricName))
            {
                bool triggered = rule.Operator switch
                {
                    ">" => metric.Value > rule.Threshold,
                    "<" => metric.Value < rule.Threshold,
                    ">=" => metric.Value >= rule.Threshold,
                    "<=" => metric.Value <= rule.Threshold,
                    _ => false
                };

                if (triggered)
                {
                    Console.WriteLine($"Alert triggered: {rule.Name} on {metric.Service}");
                }
            }
        }
    }
}
