using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeProject.Data;
using RecipeProject.Models;

namespace RecipeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealIngredientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MealIngredientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetMealIngredients()
        {
            var mealIngredients = await _context.MealIngredients
                .Include(mi => mi.Ingredient)
                .Include(mi => mi.Meal)
                .Select(mi => new
                {
                    mi.MealID,
                    mi.IngredientID,
                    mi.Quantity,
                    IngredientName = mi.Ingredient.IngredientName,
                    MealName = mi.Meal.MealName
                })
                .ToListAsync();

            return Ok(mealIngredients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetMealIngredient(int id)
        {
            var mealIngredient = await _context.MealIngredients
                .Include(mi => mi.Ingredient)
                .Include(mi => mi.Meal)
                .Select(mi => new
                {
                    mi.MealID,
                    mi.IngredientID,
                    mi.Quantity,
                    IngredientName = mi.Ingredient.IngredientName,
                    MealName = mi.Meal.MealName
                })
                .FirstOrDefaultAsync(mi => mi.MealID == id && mi.IngredientID == id);

            if (mealIngredient == null)
            {
                return NotFound();
            }

            return Ok(mealIngredient);
        }

        [HttpPost]
        public async Task<ActionResult<MealIngredients>> PostMealIngredient(MealIngredients mealIngredient)
        {
            _context.MealIngredients.Add(mealIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMealIngredient", new { id = mealIngredient.MealID }, mealIngredient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMealIngredient(int id, MealIngredients mealIngredient)
        {
            if (id != mealIngredient.MealID)
            {
                return BadRequest();
            }

            _context.Entry(mealIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealIngredientExists(id))
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
        public async Task<IActionResult> DeleteMealIngredient(int id)
        {
            var mealIngredient = await _context.MealIngredients.FindAsync(id);
            if (mealIngredient == null)
            {
                return NotFound();
            }

            _context.MealIngredients.Remove(mealIngredient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealIngredientExists(int id)
        {
            return _context.MealIngredients.Any(e => e.MealID == id);
        }
    }
}




/*
namespace RecipeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealIngredientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MealIngredientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MealIngredients>>> GetMealIngredients()
        {
            return await _context.MealIngredients
                .Include(mi => mi.Ingredient)
                .Include(mi => mi.Meal)
                .ToListAsync();
        }

        [HttpGet("{mealId}/{ingredientId}")]
        public async Task<ActionResult<MealIngredients>> GetMealIngredient(int mealId, int ingredientId)
        {
            var mealIngredient = await _context.MealIngredients
                .Include(mi => mi.Ingredient)
                .Include(mi => mi.Meal)
                .FirstOrDefaultAsync(mi => mi.MealID == mealId && mi.IngredientID == ingredientId);

            if (mealIngredient == null)
            {
                return NotFound();
            }

            return mealIngredient;
        }

        [HttpPost]
        public async Task<ActionResult<MealIngredients>> PostMealIngredient(MealIngredients mealIngredient)
        {
            _context.MealIngredients.Add(mealIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMealIngredient), new { mealId = mealIngredient.MealID, ingredientId = mealIngredient.IngredientID }, mealIngredient);
        }

        [HttpPut("{mealId}/{ingredientId}")]
        public async Task<IActionResult> PutMealIngredient(int mealId, int ingredientId, MealIngredients mealIngredient)
        {
            if (mealId != mealIngredient.MealID || ingredientId != mealIngredient.IngredientID)
            {
                return BadRequest();
            }

            _context.Entry(mealIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealIngredientExists(mealId, ingredientId))
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

        [HttpDelete("{mealId}/{ingredientId}")]
        public async Task<IActionResult> DeleteMealIngredient(int mealId, int ingredientId)
        {
            var mealIngredient = await _context.MealIngredients
                .FirstOrDefaultAsync(mi => mi.MealID == mealId && mi.IngredientID == ingredientId);
            if (mealIngredient == null)
            {
                return NotFound();
            }

            _context.MealIngredients.Remove(mealIngredient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealIngredientExists(int mealId, int ingredientId)
        {
            return _context.MealIngredients.Any(e => e.MealID == mealId && e.IngredientID == ingredientId);
        }
    }
}*/
