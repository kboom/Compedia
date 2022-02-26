using System.IdentityModel.Tokens.Jwt;
using Compedia.WebApp;

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

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute()
				.RequireAuthorization());

app.Run();
