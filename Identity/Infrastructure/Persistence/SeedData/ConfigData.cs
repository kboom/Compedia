using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServerAspNetIdentity;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity.Infrastructure.Persistence.SeedData;

public static class ConfigData
{
	public static void SeedClientDataInto(this WebApplication app)
	{
		using var scope = app.Services.CreateScope();
		var services = scope.ServiceProvider;

		var context = services.GetRequiredService<ConfigurationDbContext>();
		context.Database.EnsureDeleted();
		context.Database.Migrate();
		AddClients(context);
		AddResources(context);
		AddApiScopes(context);
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
