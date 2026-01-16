namespace RecipeProject.Models
{
    public class Ingredients
    {
        public int IngredientID { get; set; }
        public string IngredientName { get; set; }
        public ICollection<MealIngredients> MealIngredients { get; set; } 
    }

}
