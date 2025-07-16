var builder = DistributedApplication.CreateBuilder(args);

var db = builder.AddPostgres("pg")
                .WithDataVolume(builder.ExecutionContext.IsPublishMode ? "pgvolume" : null)
                .WithPgAdmin()
                .AddDatabase("instagram");

var migrations = builder.AddProject<Projects.instagram_MigrationService>("migrations")
    .WithReference(db)
    .WaitFor(db);

var apiService = builder.AddProject<Projects.instagram_ApiService>("api")
    .WithHttpHealthCheck("/health")
    .WithReference(db)
    .WaitFor(db)
    .WithReference(migrations)
    .WaitFor(migrations)
    .WithExternalHttpEndpoints();

var frontend = builder.AddNpmApp("frontend", "../Instagram.Web")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(port: 62430, env: "VITE_PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

apiService.WithReference(frontend);
builder.Build().Run();
