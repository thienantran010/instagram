using System.Diagnostics;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using instagram.Data.Entities;
using instagram.Data.Contexts;

using OpenTelemetry.Trace;

namespace instagram.MigrationService;

public class Worker(
    IServiceProvider serviceProvider,
    IHostApplicationLifetime hostApplicationLifetime) : BackgroundService
{
    public const string ActivitySourceName = "Migrations";
    private static readonly ActivitySource s_activitySource = new(ActivitySourceName);

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var activity = s_activitySource.StartActivity("Migrating database", ActivityKind.Client);

        try
        {
            using var scope = serviceProvider.CreateScope();
            
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await RunMigrationAsync(dbContext, cancellationToken);
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            await SeedDataAsync(userManager, cancellationToken);
        }
        catch (Exception ex)
        {
            activity?.RecordException(ex);
            throw;
        }

        hostApplicationLifetime.StopApplication();
    }

    private static async Task RunMigrationAsync(ApplicationDbContext dbContext, CancellationToken cancellationToken)
    {
        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async () =>
        {
            // Run migration in a transaction to avoid partial migration if it fails.
            await dbContext.Database.MigrateAsync(cancellationToken);
        });
    }

    public static async Task SeedDataAsync(
        UserManager<User> userManager,
        CancellationToken cancellationToken = default)
    {
        // Check if the default user already exists
        var existingUser = await userManager.FindByNameAsync("admin@example.com");
        if (existingUser is null)
        {
            var user = new User
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                FirstName = "Admin",
                LastName = "User",
                Bio = "This is the default admin user.",
                PictureUrl = null
            };

            var result = await userManager.CreateAsync(user, "admin");
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create seed user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }
        else
        {
            existingUser.UserName = "admin@example.com";
            existingUser.Email = "admin@example.com";
            existingUser.FirstName = "Admin";
            existingUser.LastName = "User";
            existingUser.Bio = "This is the default admin user.";
            existingUser.PictureUrl = null;

            var updateResult = await userManager.UpdateAsync(existingUser);
            if (!updateResult.Succeeded)
            {
                throw new Exception($"Failed to update seed user: {string.Join(", ", updateResult.Errors.Select(e => e.Description))}");
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(existingUser);
            var resetResult = await userManager.ResetPasswordAsync(existingUser, token, "admin");

            if (!resetResult.Succeeded)
            {
                throw new Exception($"Failed to reset seed user password: {string.Join(", ", resetResult.Errors.Select(e => e.Description))}");
            }
            
        }
    }
}