// great example here https://github.com/scottbrady91/IdentityServer4-Swagger-Integration
// and here https://github.com/IdentityServer/IdentityServer4/tree/main/samples/Quickstarts

using Compedia.Identity;
using Compedia.Identity.Controllers;
using Compedia.Identity.Infrastructure.Logging;
using Compedia.Identity.Infrastructure.Persistence;
using Compedia.Libs.LanguageExtensions;
using IdentityServerAspNetIdentity;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Action<WebApplication>[] actions = {
	builder.ConfigureLogging(),
	builder.ConfigurePersistence(),
	builder.ConfigureIdentityServer(),
	builder.ConfigureControllers()
};

var app = builder.Build();

actions.Consume(app);

try
{
    seedDatabase();
} catch (Exception ex)
{
    Log.Fatal(ex, "Could not seed database.");
    return 1;
}

try
{
    Log.Information("Starting host...");
    app.Run();
    return 0;
}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly.");
    return 1;
}
finally
{
    Log.CloseAndFlush();
}

void seedDatabase()
{
    Log.Information("Seeding database...");
    var config = app.Services.GetRequiredService<IConfiguration>();
    var connectionString = config.GetConnectionString("DefaultConnection");
    SeedData.EnsureSeedData(connectionString);
    Log.Information("Done seeding database.");
}
