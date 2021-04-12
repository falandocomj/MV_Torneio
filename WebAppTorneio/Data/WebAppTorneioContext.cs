using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAppTorneio.Models;

namespace WebAppTorneio.Data
{
    public class WebAppTorneioContext : DbContext
    {
        public WebAppTorneioContext (DbContextOptions<WebAppTorneioContext> options)
            : base(options)
        {
        }

        public DbSet<WebAppTorneio.Models.Jogador> Jogador { get; set; }
    }
}
