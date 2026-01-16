using RecipeProject.Business.Abstract;
using RecipeProject.Data.Abstract;
using RecipeProject.Models;
using System.Collections.Generic;

namespace RecipeProject.Business.Concrete
{
    
    public class MealManager : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;

        

        public MealManager(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
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

        public Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
        public Meals Update(Meals meals)
        {
            return _recipeRepository.Update(meals);
        }
    }
}
