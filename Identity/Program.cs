// great example here https://github.com/scottbrady91/IdentityServer4-Swagger-Integration
// and here https://github.com/IdentityServer/IdentityServer4/tree/main/samples/Quickstarts

using Compedia.Identity;
using Compedia.Identity.Controllers;
using Compedia.Identity.Infrastructure.Logging;
using Compedia.Identity.Infrastructure.Persistence;
using Compedia.Libs.LanguageExtensions;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Action<WebApplication>[] actions = {
	builder.ConfigureLogging(),
	builder.ConfigurePersistence(),
	builder.ConfigureIdentityServer(),
	builder.ConfigureControllers(),
	builder.ConfigureHealth()
};

var app = builder.Build();

actions.Consume(app);

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
