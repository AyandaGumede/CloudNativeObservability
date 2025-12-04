using CNO.Data;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;

using CNO.Repository.Metrics;
using CNO.Repository.Logs;

using CNO.Services.Logs;
using CNO.Services.Metrics;

using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog (no assignment)
builder.Host.UseSerilog((ctx, lc) =>
    lc.WriteTo.Console()
);

// DbContext
builder.Services.AddDbContext<TelemetryDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("TelemetryDatabase"))
);

// Metrics Services
builder.Services.AddScoped<IMetricRepository, MetricRepository>();
builder.Services.AddScoped<IMetricService, MetricService>();

// Logs Services
builder.Services.AddScoped<ILogsRepo, LogRepo>();
builder.Services.AddScoped<ILogService, LogService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Optional: log HTTP requests
app.UseSerilogRequestLogging();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();
