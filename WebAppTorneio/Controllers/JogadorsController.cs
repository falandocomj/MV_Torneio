using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppTorneio.Models;

namespace WebAppTorneio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadorsController : ControllerBase
    {
        private readonly TorneioDBContext _context;

        public JogadorsController(TorneioDBContext context)
        {
            _context = context;
        }

        // GET: api/Jogadors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jogador>>> GetJogadors()
        {
            return await _context.Jogadors.ToListAsync();
        }

        // GET: api/Jogadors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jogador>> GetJogador(int id)
        {
            var jogador = await _context.Jogadors.FindAsync(id);

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }

        // PUT: api/Jogadors/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJogador(int id, Jogador jogador)
        {
            if (id != jogador.Id)
            {
                return BadRequest();
            }

            _context.Entry(jogador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogadorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Jogadors
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Jogador>> PostJogador(Jogador jogador)
        {
            _context.Jogadors.Add(jogador);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJogador", new { id = jogador.Id }, jogador);
        }

        // DELETE: api/Jogadors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Jogador>> DeleteJogador(int id)
        {
            var jogador = await _context.Jogadors.FindAsync(id);
            if (jogador == null)
            {
                return NotFound();
            }

            _context.Jogadors.Remove(jogador);
            await _context.SaveChangesAsync();

            return jogador;
        }

        private bool JogadorExists(int id)
        {
            return _context.Jogadors.Any(e => e.Id == id);
        }
    }
}
