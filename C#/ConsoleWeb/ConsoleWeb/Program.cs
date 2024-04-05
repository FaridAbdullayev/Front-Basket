using ConsoleWeb.Entites;
using ConsoleWeb;

AppDbContext appDbContext = new AppDbContext();




var appBuilder = WebApplication.CreateBuilder();

appBuilder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = appBuilder.Build();

app.UseCors("AllowAll");

app.MapGet("/", () =>
{
    return "Hello, World!";
});

app.MapGet("/products", () =>
{
    return appDbContext.Products.ToList();
});

app.MapGet("/products/{id}", (int id) =>
{
    var data = appDbContext.Products.Find(id);
    if (data == null) return Results.NotFound("product not found!");
    return Results.Ok(data);
});

app.MapPost("/products", (Product product) =>
{
    appDbContext.Add(product);
    appDbContext.SaveChanges();
    return Results.Ok();
});


app.Run();
