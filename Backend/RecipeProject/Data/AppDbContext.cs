using Microsoft.EntityFrameworkCore;
using RecipeProject.Models;

namespace RecipeProject.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Ingredients> Ingredients { get; set; }
        public DbSet<Meals> Meals { get; set; }
        public DbSet<MealIngredients> MealIngredients { get; set; }
        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Ingredients>().HasKey(i => i.IngredientID);
            modelBuilder.Entity<Meals>().HasKey(m => m.MealID);
            modelBuilder.Entity<Users>().HasKey(u => u.UserID);

            // Define composite key for MealIngredients
            modelBuilder.Entity<MealIngredients>()
                .HasKey(mi => new { mi.MealID, mi.IngredientID });

            // Define relationships
            modelBuilder.Entity<MealIngredients>()
                .HasOne(mi => mi.Meal)
                .WithMany(m => m.MealIngredients)
                .HasForeignKey(mi => mi.MealID);

            modelBuilder.Entity<MealIngredients>()
                .HasOne(mi => mi.Ingredient)
                .WithMany(i => i.MealIngredients)
                .HasForeignKey(mi => mi.IngredientID);

            base.OnModelCreating(modelBuilder);

        }
    }
}




/*using Microsoft.EntityFrameworkCore;
using RecipeProject.Models;


namespace RecipeProject.Data
{
    public class AppDbContext : DbContext
    {
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //public AppDbContext()   {     }

        public DbSet<Ingredients> Ingredients { get; set; }
        public DbSet<Meals> Meals { get; set; }
        public DbSet<MealIngredients> MealIngredients { get; set; }
        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Ingredients>().HasKey(i => i.IngredientID);
            modelBuilder.Entity<MealIngredients>().HasKey(mi => mi.MealIngredientID);
            modelBuilder.Entity<Meals>().HasKey(m => m.MealID);
            modelBuilder.Entity<Users>().HasKey(u => u.UserID);

            
            modelBuilder.Entity<MealIngredients>()
            .HasOne(mi => mi.Meal)
            .WithMany(m => m.MealIngredients)
            .HasForeignKey(mi => mi.MealID);

            modelBuilder.Entity<MealIngredients>()
                .HasKey(mi => new { mi.MealID, mi.IngredientID });


          
    
            modelBuilder.Entity<MealIngredients>()
            .HasOne(mi => mi.Ingredient)
            .WithMany(i => i.MealIngredients)
            .HasForeignKey(mi => mi.IngredientID);

            
            

            modelBuilder.Entity<MealIngredients>()
                .HasOne(mi => mi.Meal)
                .WithMany(m => m.MealIngredients)
                .HasForeignKey(mi => mi.MealID);

            modelBuilder.Entity<MealIngredients>()
                .HasOne(mi => mi.Ingredient)
                .WithMany(i => i.MealIngredients)
                .HasForeignKey(mi => mi.IngredientID);

            

            modelBuilder.Entity<Users>()
                .HasKey(u => u.UserID);

        }
    }
}
*/
