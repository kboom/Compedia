using Compedia.Identity.Infrastructure.Persistence.SeedData;
using IdentityServerAspNetIdentity.Data;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity.Infrastructure.Persistence;

public static class PersistenceConfig
{
	public static Action<WebApplication> ConfigurePersistence(this WebApplicationBuilder builder)
	{
		var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
		if (builder.Environment.IsDevelopment())
		{
			builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));
		} else
		{
			builder.Services.AddDbContext<ApplicationDbContext>(options =>
				options.UseSqlServer(connectionString,
				b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
		}
	

		return app => {
			if(app.Configuration.GetValue<bool>("Persistence:SeedData"))
			{
				DataSeed.SeedDataInto(app);
			}
		};
	}
}
