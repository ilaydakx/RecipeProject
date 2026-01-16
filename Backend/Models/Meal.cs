using System.Collections.Generic;
using System;

namespace Models
{
    public class Meal
    {
        public short MealID { get; set; }

        public string MealName { get; set; }
        
        public string MealRecipe { get; set; }
        
        public string MealPicture { get; set; }
       
        public DateTime MealDate { get; set; }
       
        public float MealPoint { get; set; }
        
        public short CategoryID { get; set; }
        
        public Categories Category { get; set; }
        
        public ICollection<MealIngredients> MealIngredients { get; set; } //= new List<MealIngredients>();
        
        public ICollection<Comments> Comments { get; set; } //= new List<Comments>();
       
        public string Title { get; internal set; }

    }
}
