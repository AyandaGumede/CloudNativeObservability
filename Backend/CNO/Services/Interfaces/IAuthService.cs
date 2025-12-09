using CNO.Models.Auth;

namespace CNO.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(string email, string password);
        Task<Login?> GetUserByEmailAsync(string email);
    }
}
