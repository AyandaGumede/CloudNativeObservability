using CNO.Models.Auth;
using CNO.Repository.Interfaces;
using CNO.Services.Interfaces;

namespace CNO.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ILoginRepo _loginRepo;
        private readonly IJwtService _jwtService;

        public AuthService(ILoginRepo loginRepo, IJwtService jwtService)
        {
            _loginRepo = loginRepo;
            _jwtService = jwtService;
        }

        public async Task<string?> LoginAsync(string email, string password)
        {
            var isValid = await _loginRepo.ValidateCredentialsAsync(email, password);
            if (!isValid) return null;

            var user = await _loginRepo.GetEmailAsync(email);
            if (user == null) return null;

           
            return _jwtService.GenerateToken(user.Email);
        }

        public async Task<Login?> GetUserByEmailAsync(string email)
        {
            return await _loginRepo.GetEmailAsync(email);
        }
    }
}
