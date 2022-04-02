using System.IdentityModel.Tokens.Jwt;
using System.Net;
using Compedia.WebApp;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

var odicSettings = builder.Configuration.GetSection("OidcSettings").Get<OidcSettings>();

builder.Services.AddAuthentication(options =>
{
	options.DefaultScheme = "Cookies";
	options.DefaultChallengeScheme = "oidc";
})
.AddCookie("Cookies")
.AddOpenIdConnect("oidc", options =>
{
	options.Authority = odicSettings.AuthorityServerUrl;
	options.ClientId = odicSettings.ClientId;
	options.ClientSecret = odicSettings.ClientSecret;
	options.ResponseType = "code";

	options.Scope.Add("api1");
	options.SaveTokens = true;
});

var app = builder.Build();

if(builder.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
}
else
{
	app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
if(!builder.Environment.IsDevelopment())
{
	app.UseSpaStaticFiles();
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute()
				.RequireAuthorization());

app.UseSpa(spa =>
{
	// To learn more about options for serving an Angular SPA from ASP.NET Core,
	// see https://go.microsoft.com/fwlink/?linkid=864501

	spa.Options.SourcePath = "ClientApp";

	if(builder.Environment.IsDevelopment())
	{
		//spa.UseAngularCliServer(npmScript: "start");
		spa.UseReactDevelopmentServer(npmScript: "start");
		spa.UseProxyToSpaDevelopmentServer(builder.Configuration["SpaBaseUrl"] ?? "http://localhost:3000");
	}
});

app.Run();
