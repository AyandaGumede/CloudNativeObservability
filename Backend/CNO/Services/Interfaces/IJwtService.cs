namespace CNO.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(string email);
    }

}
