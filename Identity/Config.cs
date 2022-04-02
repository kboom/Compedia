using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServerAspNetIdentity;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
			new IdentityResources.Email()
		};


    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
            new ApiScope("api1", "My API"),
			new ApiScope("webapi", "Web API")
		};

    public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            // machine to machine client
            new Client
            {
                ClientId = "client",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                // scopes that client has access to
                AllowedScopes = { "api1" }
            },

			// JavaScript Client from SPA
            new Client
			{
					ClientId = "js.implicit",
					ClientName = "SPA",
					AllowedGrantTypes = GrantTypes.Implicit,
					AllowAccessTokensViaBrowser = true,
					RequireClientSecret = false,

					RedirectUris =           { "https://compedia.local:9443/callback" },
					PostLogoutRedirectUris = { "https://compedia.local:9443/index" },
					AllowedCorsOrigins =     { "https://compedia.local:9443" },

					RequireConsent = false,
                    AllowRememberConsent = false,
					AlwaysSendClientClaims = true,
					AlwaysIncludeUserClaimsInIdToken = true,
					AccessTokenType = AccessTokenType.Jwt,

					AllowedScopes =
					{
							IdentityServerConstants.StandardScopes.OpenId,
							IdentityServerConstants.StandardScopes.Email,
							IdentityServerConstants.StandardScopes.Profile,
							"webapi"
					}
			},
                
            // interactive ASP.NET Core MVC client
            new Client
            {
                ClientId = "clientId",
                ClientSecrets = { new Secret("clientSecret".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                    
                // where to redirect to after login
                RedirectUris = { "https://compedia.local:9443/signin-oidc" },

                // where to redirect to after logout
                PostLogoutRedirectUris = { "https://compedia.local:9443/signout-callback-oidc" },

                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "api1"
                }
            }
        };
}
