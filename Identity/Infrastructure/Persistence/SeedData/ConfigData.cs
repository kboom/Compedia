using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServerAspNetIdentity;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity.Infrastructure.Persistence.SeedData;

public static class ConfigData
{
	public static void SeedConfigData(this WebApplication app)
	{
		using var scope = app.Services.CreateScope();
		var services = scope.ServiceProvider;

		var persistedGrantDbContext = services.GetRequiredService<PersistedGrantDbContext>();
		persistedGrantDbContext.Database.EnsureDeleted();
		persistedGrantDbContext.Database.Migrate();

		var configurationDbContext = services.GetRequiredService<ConfigurationDbContext>();
		configurationDbContext.Database.EnsureDeleted();
		configurationDbContext.Database.Migrate();
		AddClients(configurationDbContext);
		AddResources(configurationDbContext);
		AddApiScopes(configurationDbContext);
	}

	private static void AddApiScopes(ConfigurationDbContext context)
	{
		foreach(var resource in Config.ApiScopes)
		{
			context.ApiScopes.Add(resource.ToEntity());
		}
		context.SaveChanges();
	}

	private static void AddResources(ConfigurationDbContext context)
	{
		foreach(var resource in Config.IdentityResources)
		{
			context.IdentityResources.Add(resource.ToEntity());
		}
		context.SaveChanges();
	}

	private static void AddClients(ConfigurationDbContext context)
	{
		foreach(var client in Config.Clients)
		{
			context.Clients.Add(client.ToEntity());
		}
		context.SaveChanges();
	}
}
