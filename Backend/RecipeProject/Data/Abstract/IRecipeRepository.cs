using RecipeProject.Models;

namespace RecipeProject.Data.Abstract
{
    public interface IRecipeRepository
    {
        List<Meals> GetMeals();

        Meals GetMealsById(int id);

        Meals Add(Meals meals);

        Meals Update(Meals meals);

        void Delete(int id);

        
    }
}
