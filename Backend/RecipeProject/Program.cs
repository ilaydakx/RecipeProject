/*using Microsoft.EntityFrameworkCore;
using RecipeProject.Data;
using RecipeProject.Business.Abstract;
using RecipeProject.Business.Concrete;
using RecipeProject.Data.Abstract;
using RecipeProject.Data.Concrete;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

internal class Program
{
    private static void Main(string[] args)
    {


        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        //builder.Services.AddControllers();
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve);


        // Register the AppDbContext with scoped lifetime
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Register services with scoped lifetime
        builder.Services.AddScoped<IRecipeService, MealManager>();
        builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "RecipeProject API", Version = "v1" });
        });


        // Configure CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin()   //WithOrigins("http://localhost:5173/")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        // Add Swagger for API documentation
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RecipeProject v1"));
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.UseStaticFiles(/);

        app.UseRouting();

        app.UseAuthorization();

        app.UseCors("AllowAll");

        //app.MapControllers();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        app.Run();
    }
}
*/

using Microsoft.EntityFrameworkCore;
using RecipeProject.Data;
using RecipeProject.Business.Abstract;
using RecipeProject.Business.Concrete;
using RecipeProject.Data.Abstract;
using RecipeProject.Data.Concrete;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve);

        // Register the AppDbContext with scoped lifetime
        /*builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));*/
        builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptions => sqlServerOptions.CommandTimeout(120) // Set the command timeout here
    ));



        // Register services with scoped lifetime
        builder.Services.AddScoped<IRecipeService, MealManager>();
        builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();

        // Configure CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policyBuilder =>
                {
                    policyBuilder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
                });
        });

        // Add Swagger for API documentation
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "RecipeProject API", Version = "v1" });
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RecipeProject v1"));
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }
       


        app.UseHttpsRedirection();

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
            RequestPath = ""
        });




        app.UseRouting();

        app.UseCors("AllowAll");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
