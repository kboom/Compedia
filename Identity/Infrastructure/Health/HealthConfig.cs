namespace Compedia.Identity.Infrastructure.Persistence;

public static class HealthConfig
{
	public static Action<WebApplication> ConfigureHealth(this WebApplicationBuilder builder)
	{
		builder.Services.AddHealthChecks();

		return _ => { };
	}
}
