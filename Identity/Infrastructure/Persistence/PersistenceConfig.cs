using IdentityServerAspNetIdentity.Data;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity.Infrastructure.Persistence;

public static class PersistenceConfig
{
	public static Action<WebApplication> ConfigurePersistence(this WebApplicationBuilder builder)
	{
		builder.Services.AddDbContext<ApplicationDbContext>(options =>
		options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

		return _ => { };
	}
}
