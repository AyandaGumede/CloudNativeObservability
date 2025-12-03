using CNO.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

object value = builder.Host.UseSerilog((ctx, lc) =>
    lc.WriteTo.Console()
);

builder.Services.AddDbContext<TelemetryDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("TelemetryDatabase"))
);




builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();
