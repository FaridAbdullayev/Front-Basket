using ConsoleWeb.Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleWeb
{
    internal class AppDbContext:DbContext
    {

        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-U6B6T1F\\SQLEXPRESS;Database=homeworkwebdb;Trusted_connection=true; TrustServerCertificate=True");
        }
    }
}
