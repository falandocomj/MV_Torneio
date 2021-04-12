using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAppTorneio.Models
{
    public class Jogador
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public String Nome { get; set; }

        [Column(TypeName = "nvarchar(14)")]
        public String Cpf { get; set; }
        
        [Column(TypeName = "nvarchar(25)")]
        public String Sexo { get; set; }
    }
}
