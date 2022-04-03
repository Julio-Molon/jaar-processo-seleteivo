using CarsFipe.Data;
using CarsFipe.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarsFipe.Controllers
{
    [ApiController]
    [Route("v1/cars")]
    public class CarController: ControllerBase
    {
        [HttpGet("getAllCars")]
        public async Task<IActionResult> GetAsync(
            [FromServices] DataContext context)
        {

            var cars = await context.Cars.ToListAsync();
            return Ok(cars);
        }

        [HttpGet("{placa}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromRoute] string placa,
            [FromServices] DataContext context)
        {
            var cars = await context.Cars.FirstOrDefaultAsync(x => x.Placa.Equals(placa));
            
            return Ok(cars);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(
        [FromBody] Car model,
        [FromServices] DataContext context)
        {
            await context.Cars.AddAsync(model);
            await context.SaveChangesAsync();

            return Created($"v1/cars/{model.Placa}", model);
            
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutAsync(
        [FromRoute] int Id,
        [FromBody] Car model,
        [FromServices] DataContext context)
        {

            var car = await context.Cars.FirstOrDefaultAsync(x => x.Id == Id);

            if (car == null)
            {
                return NotFound();
            }

            car.CodigoFipe = model.CodigoFipe;
            car.Placa = model.Placa;
            car.Modelo = model.Modelo;
            car.AnoModelo = model.AnoModelo;
            car.TipoVeiculo = model.TipoVeiculo;
            car.DataConsulta = model.DataConsulta;
            car.Combustivel = model.Combustivel;
            car.MesReferencia = model.MesReferencia;
            car.Marca = model.Marca;
            car.SiglaCombustivel = model.SiglaCombustivel;
            car.Valor = model.Valor;
            car.Id = Id;
            context.Cars.Update(car);
            await context.SaveChangesAsync();

            return Created($"v1/cars/{model.Placa}", model);
        }

        [Route("")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(
        [FromRoute] int Id,
        [FromServices] DataContext context)
        {

            var car = await context.Cars.FirstOrDefaultAsync(x => x.Id == Id);

            if (car == null)
            {
                return NotFound();
            }

            context.Cars.Remove(car);
            await context.SaveChangesAsync();

            return Ok(car);
        }
    }
}
