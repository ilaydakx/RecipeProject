using RecipeProject.Data.Abstract;
using RecipeProject.Models;

namespace RecipeProject.Data.Concrete
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly AppDbContext appDbContext;
        public RecipeRepository(AppDbContext _appDbContext)
        {
            appDbContext = _appDbContext;
        }
        public Meals Add(Meals meals)
        {
            
                appDbContext.Meals.Add(meals);
                appDbContext.SaveChanges();
                return meals;
            
        }

        public void Delete(int id)
        {

            var deletedMeal = GetMealsById(id);
            if (deletedMeal != null)
            {
                appDbContext.Meals.Remove(deletedMeal);
                appDbContext.SaveChanges();
            }

        }

        public List<Meals> GetMeals()
        {
            return appDbContext.Meals.ToList();
        }

        public Meals GetMealsById(int id)
        {
            return appDbContext.Meals.Find(id);
        }

        public Meals Update(Meals meals)
        {
            appDbContext.Meals.Update(meals);
            appDbContext.SaveChanges();
            return meals;
        }
    }
}
