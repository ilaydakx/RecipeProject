
using System.ComponentModel.DataAnnotations.Schema;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace RecipeProject.Models
{
    public class Meals
    {
        public int MealID { get; set; }
        public string MealName { get; set; }
        public string MealRecipe { get; set; }
        public string MealPicture { get; set; }


        //public IFormFile  File { get; set; }

        public ICollection<MealIngredients> MealIngredients { get; set; }// = new List<MealIngredients>();

    }
}
