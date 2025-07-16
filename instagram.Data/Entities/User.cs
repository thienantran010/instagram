using Microsoft.AspNetCore.Identity;

namespace instagram.Data.Entities;

public class User : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Name { get => $"{FirstName} {LastName}"; }
    public string? Bio { get; set; }
    public string? PictureUrl { get; set; }
}