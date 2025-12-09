using CNO.Data;
using CNO.Models.Auth;
using CNO.Repository.Interfaces;
using CNO.Repository.Metrics;
using CNO.Repository.Logs;
using CNO.Repository.Alerts;
using CNO.Repository.Auth;
using CNO.Services.Interfaces;
using CNO.Services.Metrics;
using CNO.Services.Logs;
using CNO.Services.Auth;
using CNO.Services.Alert;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Serilog 
builder.Host.UseSerilog((ctx, lc) =>
    lc.WriteTo.Console()
);

// JWT 


// Bind Jwt section to JwtSettings (Options pattern)
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));



// Read JwtSettings once for authentication setup
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtSettings = jwtSection.Get<JwtSettings>() ?? new JwtSettings();



// Register JwtService (constructor expects IOptions<JwtSettings>)
builder.Services.AddSingleton<IJwtService, JwtService>();



// Configure JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; 
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = !string.IsNullOrEmpty(jwtSettings.Issuer),
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = !string.IsNullOrEmpty(jwtSettings.Audience),
        ValidAudience = jwtSettings.Audience,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret ?? string.Empty)),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromSeconds(30)
    };
});




// DbContext 
builder.Services.AddDbContext<TelemetryDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("TelemetryDatabase"))
);



// -------------------- Repos & Services --------------------

// Auth
builder.Services.AddScoped<ILoginRepo, LoginRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();


// Alerts
builder.Services.AddScoped<IAlertRuleRepository, AlertRepos>();
builder.Services.AddScoped<IAlertService, AlertService>();


// Metrics
builder.Services.AddScoped<IMetricRepository, MetricRepository>();
builder.Services.AddScoped<IMetricService, MetricService>();


// Logs
builder.Services.AddScoped<ILogsRepo, LogRepo>();
builder.Services.AddScoped<ILogService, LogService>();


//  MVC / Swagger 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Middleware 
app.UseSerilogRequestLogging();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
