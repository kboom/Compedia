﻿using Compedia.Identity.Infrastructure.Persistence.SeedData;
using IdentityServerAspNetIdentity.Data;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity.Infrastructure.Persistence;

public static class PersistenceConfig
{
	public static Action<WebApplication> ConfigurePersistence(this WebApplicationBuilder builder)
	{
		var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
		builder.Services.AddDbContext<ApplicationDbContext>(options =>
			options.UseSqlServer(connectionString, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName))
		);

		return app => {
			if(app.Configuration.GetValue<bool>("Persistence:SeedData"))
			{
				UserData.SeedUserDataInto(app);
				app.SeedConfigData();
			}

			if(app.Environment.IsDevelopment())
			{
				app.UseMigrationsEndPoint();
			}
		};
	}
}
