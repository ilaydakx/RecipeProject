using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeProject.Data;
using RecipeProject.DTO;
using RecipeProject.Models;

namespace RecipeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IngredientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingredients>>> GetIngredients()
        {
            return await _context.Ingredients.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ingredients>> GetIngredient(int id)
        {
            var ingredient = await _context.Ingredients.FindAsync(id);

            if (ingredient == null)
            {
                return NotFound();
            }

            return ingredient;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMeal([FromForm] MealCreateDto mealDto)
        {
            try
            {
                if (mealDto.MealPicture != null)
                {
                    var filePath = Path.Combine("wwwroot/images", mealDto.MealPicture.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await mealDto.MealPicture.CopyToAsync(stream);
                    }
                    mealDto.MealPictureUrl = $"/images/{mealDto.MealPicture.FileName}";
                }

                var meal = new Meals
                {
                    MealName = mealDto.MealName,
                    MealRecipe = mealDto.MealRecipe,
                    MealPicture = mealDto.MealPictureUrl,
                    MealIngredients = new List<MealIngredients>()
                };

                foreach (var ingredientDto in mealDto.Ingredients)
                {
                    Ingredients ingredient;
                    if (ingredientDto.IngredientID == 0)
                    {
                        // Ingredient bulunamadı, yeni ingredient oluştur
                        ingredient = new Ingredients
                        {
                            IngredientName = ingredientDto.IngredientName
                        };
                        _context.Ingredients.Add(ingredient);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        ingredient = await _context.Ingredients
                            .FirstOrDefaultAsync(i => i.IngredientID == ingredientDto.IngredientID);
                        if (ingredient == null)
                        {
                            return BadRequest($"Ingredient with ID {ingredientDto.IngredientID} not found.");
                        }
                    }

                    meal.MealIngredients.Add(new MealIngredients
                    {
                        IngredientID = ingredient.IngredientID,
                        Quantity = ingredientDto.Quantity
                    });
                }

                _context.Meals.Add(meal);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Meal created successfully", MealId = meal.MealID });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the meal.");
            }
        }

        /*[HttpPost]
        public async Task<ActionResult<Ingredients>> PostIngredient(Ingredients ingredient)
        {
            _context.Ingredients.Add(ingredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIngredient), new { id = ingredient.IngredientID }, ingredient);
        }*/

        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredient(int id, Ingredients ingredient)
        {
            if (id != ingredient.IngredientID)
            {
                return BadRequest();
            }

            _context.Entry(ingredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngredient(int id)
        {
            var ingredient = await _context.Ingredients.FindAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            _context.Ingredients.Remove(ingredient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IngredientExists(int id)
        {
            return _context.Ingredients.Any(e => e.IngredientID == id);
        }
    }
}
