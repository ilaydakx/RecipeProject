using System;
using System.Collections.Generic;
using System.Text;
using RecipeProject.Models;

namespace RecipeProject.Business.Abstract
{
    public interface IRecipeService
    {
        List<Meals> GetMeals();

        Meals GetMealsById(int id);

        Meals Add(Meals meals);

        Meals Update(Meals meals);

        void Delete(int id);

    }
}
