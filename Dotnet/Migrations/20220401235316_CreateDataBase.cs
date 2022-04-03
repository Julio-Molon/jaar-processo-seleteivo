using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarsFipe.Migrations
{
    public partial class CreateDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Valor = table.Column<string>(type: "varchar(45)", nullable: false),
                    Marca = table.Column<string>(type: "varchar(45)", nullable: false),
                    Modelo = table.Column<string>(type: "varchar(45)", nullable: false),
                    AnoModelo = table.Column<int>(type: "INT", nullable: false),
                    Combustivel = table.Column<string>(type: "varchar(45)", nullable: false),
                    MesReferencia = table.Column<string>(type: "varchar(45)", nullable: false),
                    TipoVeiculo = table.Column<int>(type: "INT", nullable: false),
                    SiglaCombustivel = table.Column<string>(type: "varchar(45)", nullable: false),
                    DataConsulta = table.Column<string>(type: "varchar(45)", nullable: false),
                    CodigoFipe = table.Column<string>(type: "varchar(45)", nullable: false),
                    Placa = table.Column<string>(type: "varchar(45)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Car",
                table: "Cars",
                column: "Id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
