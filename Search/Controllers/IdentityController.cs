﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Compedia.Search.Controllers;

[Route("identity")]
[Authorize]
public class IdentityController:ControllerBase
{
	public IActionResult Get()
	{
		return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
	}
}
