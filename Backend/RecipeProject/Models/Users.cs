#nullable enable

namespace RecipeProject.Models
{
    public class Users
    {
        public int UserID { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public string? UserPassword { get; set; }
        public DateTime RegistrationDate { get; set; }

    }

}
