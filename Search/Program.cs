using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// accepts any access token issued by identity server
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://localhost:7080";

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false
        };
    });

// adds an authorization policy to make sure the token is for scope 'api1'
builder.Services.AddAuthorization(options => options.AddPolicy("ApiScope", policy =>
{
	policy.RequireAuthenticatedUser();
	policy.RequireClaim("scope", "api1");
}));

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapControllers()
				.RequireAuthorization("ApiScope"));

app.Run();
