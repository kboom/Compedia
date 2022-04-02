using Compedia.Identity.Infrastructure.Middleware;
using Compedia.Identity.Services;
using IdentityServer4;
using IdentityServer4.Hosting;
using IdentityServer4.Services;
using IdentityServerAspNetIdentity.Data;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity;

public static class IdentityServerConfig
{
	public static Action<WebApplication> ConfigureIdentityServer(this WebApplicationBuilder builder)
	{
		builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, AppClaimsPrincipalFactory>();

		var migrationsAssembly = typeof(ApplicationDbContext).Assembly.FullName;

		// this didn't work
		//builder.Services.AddSingleton<ICorsPolicyService>((container) => {
		//	var logger = container.GetRequiredService<ILogger<DefaultCorsPolicyService>>();
		//	return new DefaultCorsPolicyService(logger)
		//	{
		//		AllowAll = true,
		//		AllowedOrigins = { "https://compedia.local:9443", "https://identity.compedia.local:9443" }
		//	};
		//});

		builder.Services.AddIdentityServer(options =>
		{
			options.Events.RaiseErrorEvents = true;
			options.Events.RaiseInformationEvents = true;
			options.Events.RaiseFailureEvents = true;
			options.Events.RaiseSuccessEvents = true;
			options.EmitStaticAudienceClaim = true;
		})
				.AddDeveloperSigningCredential() // disable in production
				.AddConfigurationStore(options => options.ConfigureDbContext = b => b.UseSqlServer(
					builder.Configuration.GetConnectionString("ConfigurationDbConnection"),
					sql => sql.MigrationsAssembly(migrationsAssembly)
				))
				.AddOperationalStore(options =>
				{
					options.ConfigureDbContext = b => b.UseSqlServer(
						builder.Configuration.GetConnectionString("PersistedGrantDbConnection"),
						sql => sql.MigrationsAssembly(migrationsAssembly)
					);

					options.EnableTokenCleanup = true;
					options.TokenCleanupInterval = 3600;
				})
				.AddAspNetIdentity<ApplicationUser>();

		builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

		var identityProviderGoogleSection = builder.Configuration.GetSection("IdentityProviders:Google");

		builder.Services.Configure<GoogleIdentityProviderSettings>(identityProviderGoogleSection);

		builder.Services.AddAuthentication()
			.AddGoogle("Google", options =>
		 {
			 options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

			 var googleIdentityProviderSettings = identityProviderGoogleSection
		 .Get<GoogleIdentityProviderSettings>();

			 options.ClientId = googleIdentityProviderSettings.ClientId;
			 options.ClientSecret = googleIdentityProviderSettings.ClientSecret;
		 });

		return app =>
		{
			app.UseMiddleware<PublicFacingUrlMiddleware>("https://identity.compedia.local:9443");
			app.ConfigureCors();
			app.UseMiddleware<IdentityServerMiddleware>();
		};
	}
}
