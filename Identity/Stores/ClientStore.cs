using IdentityServer4.Models;
using IdentityServer4.Stores;
using IdentityServerAspNetIdentity.Data;
using Microsoft.EntityFrameworkCore;

namespace Compedia.Identity.Stores;

public class ClientStore: IClientStore
{
	private readonly ApplicationDbContext _applicationDbContext;

	public ClientStore(ApplicationDbContext applicationDbContext)
	{
		_applicationDbContext = applicationDbContext;
	}

	public Task<Client?> FindClientByIdAsync(string clientId)
	{
		return _applicationDbContext.Clients
			.Where(x => x.ClientId == clientId)
			.SingleOrDefaultAsync<Client>();
	}
}
