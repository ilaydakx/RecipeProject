namespace RecipeProject.Models
{
    public class MealIngredients
    {
        
        public int MealID { get; set; }
        public Meals Meal { get; set; }

        public int IngredientID { get; set; }
        public Ingredients Ingredient { get; set; }

        public string Quantity { get; set; }
    }

}
