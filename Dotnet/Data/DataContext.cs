using CarsFipe.Data.Mappings;
using CarsFipe.Models;
using Microsoft.EntityFrameworkCore;

namespace CarsFipe.Data
{
    public class DataContext: DbContext
    {
        private IConfiguration _configuration;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<Car> Cars { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
           => options.UseSqlServer(_configuration.GetConnectionString("sqlServerConnectionString"));

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CarMap());
        }
    }
}
