using CNO.Models.Auth;

namespace CNO.Repository.Interfaces
{
    public interface ILoginRepo
    {
        public Task<Login> GetEmailAsync(string email);

        public Task<bool> ValidateCredentialsAsync(string email, string password);
    }
}
