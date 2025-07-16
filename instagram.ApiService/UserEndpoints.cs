// IdentityEndpoints.cs
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using instagram.Data.Entities;

public static class UserEndpoints
{
    public record UserDto(string userId, string userName, string bio);
    public static RouteGroupBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/user").RequireAuthorization();

        // Custom endpoint to get the current authenticated user
        group.MapGet("", GetCurrentUser);

        async Task<Results<UnauthorizedHttpResult, NotFound, Ok<UserDto>>> GetCurrentUser(HttpContext http, [FromServices] UserManager<User> userManager)
        {
            Console.WriteLine(http.User.ToString());
            if (!http.User.Identity?.IsAuthenticated ?? true) return TypedResults.Unauthorized();

            var user = await userManager.GetUserAsync(http.User);

            if (user is null) return TypedResults.NotFound();

            return TypedResults.Ok(new UserDto(user.Id, user.UserName, user.Bio));
        }

        return group;
    }
}
