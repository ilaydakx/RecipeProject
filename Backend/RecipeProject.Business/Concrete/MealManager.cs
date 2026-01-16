using RecipeProject.Business.Abstract;
using RecipeProject.Data.Abstract;
using RecipeProject.Data.Concrete;
using RecipeProject.Models;

namespace RecipeProject.Business.Concrete
{

    public class MealManager : IRecipeService
    {
        private IRecipeRepository _recipeRepository;

        public MealManager()
        {
            _recipeRepository = new RecipeRepository();
        }


        public Meals Add(Meals meals)
        {
            return _recipeRepository.Add(meals);
        }

        public void Delete(int id)
        {
            _recipeRepository.Delete(id);
        }

        public List<Meals> GetMeals()
        {
            return _recipeRepository.GetMeals();
        }

        public Meals GetMealsById(int id)
        {
            return _recipeRepository.GetMealsById(id);
        }

        public Meals Update(Meals meals)
        {
            return _recipeRepository.Update(meals);
        }
    }
}
