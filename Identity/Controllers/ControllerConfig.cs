namespace Compedia.Identity.Controllers;

public static class ControllerConfig
{
	public static Action<WebApplication> ConfigureControllers(this WebApplicationBuilder builder)
	{
		builder.Services.AddControllersWithViews();

		return app =>
		{
			if (app.Environment.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseRouting();
			app.UseAuthorization();
			app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());
		};
	}
}
