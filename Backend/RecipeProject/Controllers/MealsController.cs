using Microsoft.AspNetCore.Mvc;
using RecipeProject.Data;
using RecipeProject.Models;
using Microsoft.EntityFrameworkCore;
using RecipeProject.DTO;

namespace RecipeProject.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        //private IRecipeService _recipeService;
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;
        
        public MealsController(AppDbContext context, IWebHostEnvironment environment)
        {
            //_recipeService = recipeService;
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetMeals()
        {
            try
            {
                var meals = await _context.Meals
                    .Include(m => m.MealIngredients)
                    .ThenInclude(mi => mi.Ingredient)
                    .ToListAsync();

                var mealDetails = meals.Select(m => new
                {
                    m.MealID,
                    m.MealName,
                    m.MealPicture,
                    Ingredients = m.MealIngredients.Select(mi => new
                    {
                        mi.Ingredient.IngredientName,
                        mi.Quantity
                    }),
                    Preparation = m.MealRecipe
                }).ToList();

                return Ok(mealDetails);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching meals.");
            }
        }


        /*
    
        [HttpPost]
        public async Task<IActionResult> CreateMeal([FromForm] MealCreateDto mealDto)
        {
            try
            {
                if (mealDto.MealID != 0)
                {
                    return BadRequest("MealID should be zero when creating a new meal.");
                }

                if (mealDto.Ingredients == null || !mealDto.Ingredients.Any())
                {
                    return BadRequest("At least one ingredient is required to create a meal.");
                }

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
                    MealIngredients = mealDto.Ingredients.Select(i => new MealIngredients
                    {
                        IngredientID = i.IngredientID,
                        Quantity = i.Quantity
                    }).ToList()
                };

                _context.Meals.Add(meal);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Meal created successfully", MealId = meal.MealID });
                //return CreatedAtAction("GetMealById", new { id = meal.MealID }, meal);
            }
            catch (Exception ex)
            {
                // Hata ayıklama için bu satırları ekleyin
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the meal.");
            }
        }*/
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
                    MealIngredients = mealDto.Ingredients.Select(i => new MealIngredients
                    {
                        IngredientID = i.IngredientID,
                        Quantity = i.Quantity
                    }).ToList()
                };

                _context.Meals.Add(meal);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Meal created successfully", MealId = meal.MealID });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return StatusCode(500, $"An error occurred while creating the meal. {ex.Message}");
            }
        }







        [HttpPost("upload-image")]
                
        public async Task<IActionResult> UploadImage( IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File not selected");

            var uploads = Path.Combine(_environment.WebRootPath, "images");
            if (!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }

            var filePath = Path.Combine(uploads, file.FileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            var imageUrl = $"/images/{file.FileName}";
            return Ok(new { Url = imageUrl });

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMealById(int id)
        {
            var meal = await _context.Meals
                .Include(m => m.MealIngredients)
                    .ThenInclude(mi => mi.Ingredient)
                .FirstOrDefaultAsync(m => m.MealID == id);

            if (meal == null)
            {
                return NotFound();
            }
            var mealDetail = new
            {
                meal.MealID,
                meal.MealName,
                meal.MealRecipe,
                meal.MealPicture,
                Ingredients = meal.MealIngredients.Select(mi => new
                {
                    mi.Ingredient.IngredientName,
                    mi.Quantity
                }).ToList()
            };

            return Ok(mealDetail);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(int id, [FromForm] MealCreateDto mealDto)
        {
            if (id != mealDto.MealID)
            {
                return BadRequest("Meal ID mismatch.");
            }

            var meal = await _context.Meals
                .Include(m => m.MealIngredients)
                .ThenInclude(mi => mi.Ingredient)
                .FirstOrDefaultAsync(m => m.MealID == id);

            if (meal == null)
            {
                return NotFound();
            }

            meal.MealName = mealDto.MealName;
            meal.MealRecipe = mealDto.MealRecipe;

            if (mealDto.MealPicture != null)
            {
                var filePath = Path.Combine("wwwroot/images", mealDto.MealPicture.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await mealDto.MealPicture.CopyToAsync(stream);
                }
                meal.MealPicture = $"/images/{mealDto.MealPicture.FileName}";
            }
            else
            {
                meal.MealPicture = mealDto.MealPictureUrl;
            }

            meal.MealIngredients.Clear();
            foreach (var ingredientDto in mealDto.Ingredients)
            {
                var ingredient = await _context.Ingredients
                    .FirstOrDefaultAsync(i => i.IngredientName == ingredientDto.IngredientName);
                if (ingredient == null)
                {
                    ingredient = new Ingredients
                    {
                        IngredientName = ingredientDto.IngredientName
                    };
                    _context.Ingredients.Add(ingredient);
                    await _context.SaveChangesAsync();
                }

                meal.MealIngredients.Add(new MealIngredients
                {
                    MealID = meal.MealID,
                    IngredientID = ingredient.IngredientID,
                    Quantity = ingredientDto.Quantity
                });
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MealExists(id))
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






        [HttpPost("recommend")]
        public ActionResult<List<Meals>> RecommendMeals([FromBody] List<int> ingredientIds)
        {
            var meals = _context.Meals
                .Where(m => m.MealIngredients
                    .All(mi => ingredientIds.Contains(mi.IngredientID)))
                .ToList();

            return Ok(meals);
        }

        [HttpPost("recommendations")]
        public IActionResult GetRecommendedRecipes([FromBody] List<int> ingredientIds)
        {
            if (ingredientIds == null || !ingredientIds.Any())
            {
                return BadRequest("No ingredients provided.");
            }

            var recipes = _context.Meals
                .Include(m => m.MealIngredients)
                .ThenInclude(mi => mi.Ingredient)
                .ToList();

            var recommendedRecipes = recipes
                .Select(r => new
                {
                    Recipe = r,
                    MatchPercentage = (double)r.MealIngredients.Count(mi => ingredientIds.Contains(mi.IngredientID)) / r.MealIngredients.Count * 100
                })
                .Where(r => r.MatchPercentage >= 65)
                .OrderByDescending(r => r.MatchPercentage)
                //.Select(r => r.Recipe)
                .Select(r => new
                {
                    r.Recipe.MealID,
                    r.Recipe.MealName,
                    r.Recipe.MealPicture,
                    r.Recipe.MealRecipe,
                    Ingredients = r.Recipe.MealIngredients.Select(mi => new
                    {
                        mi.Ingredient.IngredientName,
                        mi.Quantity
                    })
                })
                .ToList();

            return Ok(recommendedRecipes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MealExists(int id)
        {
            return _context.Meals.Any(e => e.MealID == id);
        }

    }
}









/*
        public async Task<IActionResult> UploadImage([FromForm] Meals model)
        {
            if (model.File == null || model.File.Length == 0)
                return BadRequest("Please upload a valid image.");

            var uploads = Path.Combine("images", "AllFiles");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), uploads);
            if (!Directory.Exists(pathToSave))
            {
                Directory.CreateDirectory(pathToSave);
            }
            var fileName = model.File.FileName;
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(uploads, fileName);

            if (System.IO.File.Exists(fullPath))
            {
                return BadRequest("file already exists.");
            }

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                model.File.CopyTo(stream);
            }
            return Ok();
        }
    }
}*/