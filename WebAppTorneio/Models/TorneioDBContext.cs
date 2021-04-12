using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppTorneio.Models
{
    public class TorneioDBContext: DbContext
    {
        public TorneioDBContext(DbContextOptions<TorneioDBContext> options):base(options)
        {
        }

        public DbSet<Jogador> Jogadors { get; set; }
    }
}
