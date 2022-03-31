using System.Security.Claims;
using IdentityModel;
using IdentityServerAspNetIdentity.Data;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Compedia.Identity.Infrastructure.Persistence.SeedData;

public static class UserData
{
	public static void SeedUserDataInto(this WebApplication app)
	{
		using var scope = app.Services.CreateScope();
		var services = scope.ServiceProvider;

		try
		{
			var context = services.GetRequiredService<ApplicationDbContext>();

			context.Database.EnsureDeleted();
			context.Database.Migrate();

			var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

			userManager.SeedUsers();
		}
		catch(Exception ex)
		{
			Log.Error(ex , "An error occurred while migrating or seeding the database.");
			throw;
		}
	}

	private static void SeedUsers(this UserManager<ApplicationUser> userManager)
	{
		userManager.AddUser("alice", "alice@email.com", "Pass123$", new Claim[]{
												new Claim(JwtClaimTypes.Name, "Alice Smith"),
												new Claim(JwtClaimTypes.GivenName, "Alice"),
												new Claim(JwtClaimTypes.FamilyName, "Smith"),
												new Claim(JwtClaimTypes.WebSite, "http://alice.com")
		});
	}

	private static void AddUser(this UserManager<ApplicationUser> userManager, string username, string email, string plainTextPassword, Claim[] claims)
	{
		var user = userManager.FindByNameAsync(username).Result;
		if(user == null)
		{
			user = new ApplicationUser
			{
				UserName = username,
				Email = email,
				EmailConfirmed = true ,
			};
			var result = userManager.CreateAsync(user , plainTextPassword).Result;
			if(!result.Succeeded)
			{
				throw new Exception(result.Errors.First().Description);
			}

			result = userManager.AddClaimsAsync(user, claims).Result;
			if(!result.Succeeded)
			{
				throw new Exception(result.Errors.First().Description);
			}
			Log.Debug("Created user {@User}", user);
		}
	}
}
