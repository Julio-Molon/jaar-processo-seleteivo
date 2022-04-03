using CarsFipe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarsFipe.Data.Mappings
{
    public class CarMap : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {   // Tabela
            builder.ToTable("Cars");

            // Chave Primária
            builder.HasKey(x => x.Id);

            // Identity
            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .UseIdentityColumn();

            // Propriedades
            builder.Property(x => x.CodigoFipe)
                .IsRequired()
                .HasColumnName("CodigoFipe")
                .HasColumnType("varchar(45)");

            builder.Property(x => x.Valor)
                .IsRequired()
                .HasColumnName("Valor")
                .HasColumnType("varchar(45)");

            builder.Property(x => x.Marca)
                .IsRequired()
                .HasColumnName("Marca")
                .HasColumnType("varchar(45)");

            builder.Property(x => x.Modelo)
                .IsRequired()
                .HasColumnName("Modelo")
                .HasColumnType("varchar(45)");

            builder.Property(x => x.AnoModelo)
                .IsRequired()
                .HasColumnName("AnoModelo")
                .HasColumnType("INT");

            builder.Property(x => x.Combustivel)
             .IsRequired()
             .HasColumnName("Combustivel")
             .HasColumnType("varchar(45)");

            builder.Property(x => x.SiglaCombustivel)
              .IsRequired()
              .HasColumnName("SiglaCombustivel")
              .HasColumnType("varchar(45)");

            builder.Property(x => x.Placa)
               .IsRequired()
               .HasColumnName("Placa")
               .HasColumnType("varchar(45)");

            builder.Property(x => x.MesReferencia)
             .IsRequired()
             .HasColumnName("MesReferencia")
             .HasColumnType("varchar(45)");

            builder.Property(x => x.TipoVeiculo)
            .IsRequired()
            .HasColumnName("TipoVeiculo")
            .HasColumnType("INT");

            builder.Property(x => x.DataConsulta)
                .IsRequired()
                .HasColumnName("DataConsulta")
                .HasColumnType("varchar(45)");

            // Índices
            builder
                .HasIndex(x => x.Id, "IX_Car")
                .IsUnique();
        }
            
    }
}
