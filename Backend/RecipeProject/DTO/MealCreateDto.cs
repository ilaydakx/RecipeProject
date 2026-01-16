namespace RecipeProject.DTO
{
    public class MealCreateDto
    {
        public int MealID { get; set; }
        public string MealName { get; set; }
        public string MealRecipe { get; set; }
        public IFormFile MealPicture { get; set; }
        public string MealPictureUrl { get; set; }
        public List<IngredientDto> Ingredients { get; set; }
    }
}
