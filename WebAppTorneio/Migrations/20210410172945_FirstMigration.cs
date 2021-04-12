using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppTorneio.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Jogadors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Cpf = table.Column<string>(type: "nvarchar(14)", nullable: true),
                    Sexo = table.Column<bool>(nullable: false),
                    Idade = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadors", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Jogadors");
        }
    }
}
