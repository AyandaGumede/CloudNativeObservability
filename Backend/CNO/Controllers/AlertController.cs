using CNO.Models.Alerts;
using CNO.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CNO.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlertController : ControllerBase
    {
        private readonly IAlertRuleRepository _repo;

        public AlertController(IAlertRuleRepository repo) => _repo = repo;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var rule = await _repo.GetByIdAsync(id);
            if (rule == null) return NotFound();
            return Ok(rule);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AlertRule rule)
        {
            await _repo.AddAsync(rule);
            return CreatedAtAction(nameof(GetById), new { id = rule.Id }, rule);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, AlertRule updated)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return NotFound();

            existing.Name = updated.Name;
            existing.MetricName = updated.MetricName;
            existing.Threshold = updated.Threshold;
            existing.Operator = updated.Operator;
            existing.DurationMinutes = updated.DurationMinutes;
            existing.IsActive = updated.IsActive;

            await _repo.UpdateAsync(existing);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}
