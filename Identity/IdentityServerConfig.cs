using Compedia.Identity.Services;
using IdentityServer4;
using IdentityServerAspNetIdentity;
using IdentityServerAspNetIdentity.Data;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;

namespace Compedia.Identity;

public static class IdentityServerConfig
{
	public static Action<WebApplication> ConfigureIdentityServer(this WebApplicationBuilder builder)
	{
		builder.Services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser> , AppClaimsPrincipalFactory>();

		builder.Services.AddIdentityServer(options =>
		{
			options.Events.RaiseErrorEvents = true;
			options.Events.RaiseInformationEvents = true;
			options.Events.RaiseFailureEvents = true;
			options.Events.RaiseSuccessEvents = true;
			options.EmitStaticAudienceClaim = true;
		})
				.AddDeveloperSigningCredential() // disable in production
				.AddInMemoryIdentityResources(Config.IdentityResources)
				.AddInMemoryApiScopes(Config.ApiScopes)
				.AddInMemoryClients(Config.Clients)
				.AddAspNetIdentity<ApplicationUser>();

		builder.Services.AddIdentity<ApplicationUser , IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();

		var identityProviderGoogleSection = builder.Configuration.GetSection("IdentityProviders:Google");

		builder.Services.Configure<GoogleIdentityProviderSettings>(identityProviderGoogleSection);

		builder.Services.AddAuthentication()
			.AddGoogle("Google" , options =>
			{
				options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

				var googleIdentityProviderSettings = identityProviderGoogleSection
			.Get<GoogleIdentityProviderSettings>();

				options.ClientId = googleIdentityProviderSettings.ClientId;
				options.ClientSecret = googleIdentityProviderSettings.ClientSecret;
			});

		
// builder.Services.AddScoped<IClientStore, ClientStore>(); // use this in production


		return app => app.UseIdentityServer();
	}
}
