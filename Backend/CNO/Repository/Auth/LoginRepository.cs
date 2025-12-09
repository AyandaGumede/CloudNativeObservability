using CNO.Repository.Interfaces;
using CNO.Data;
using CNO.Models.Auth; 
using Microsoft.EntityFrameworkCore;

namespace CNO.Repository.Auth
{
    public class LoginRepository : ILoginRepo
    {
        private readonly TelemetryDbContext _context;

        public LoginRepository(TelemetryDbContext context)
        {
            _context = context;
        }

        public async Task<Login> GetEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<bool> ValidateCredentialsAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            return user != null;
        }
    }
}
