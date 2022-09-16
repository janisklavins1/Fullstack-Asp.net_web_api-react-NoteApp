using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.Data;
using NoteApp.Dto;
using NoteApp.Models;

namespace NoteApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly NoteAppContext _context;
        public NoteController(NoteAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Note>> GetNotesAsync()
        {
            var noteObj = await _context.Notes
                .Include(t => t.Type)
                .ToListAsync();

            return noteObj;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Note>> CreateNoteAsync(CreateNoteDto request)
        {
            var noteType = await _context.NoteTypes.FindAsync(request.TypeId);
            if (noteType == null)
            {
                return NotFound();
            }

            var newNote = new Note() { 
                Title = request.Title,
                Description = request.Description,
                CreatedDate = request.CreatedDate,
                Type = noteType
            };

            await _context.Notes.AddAsync(newNote);
            await _context.SaveChangesAsync();

            return Ok(newNote.TypeId);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Note>> UpdateNoteAsync(int id, CreateNoteDto request)
        {
            var noteType = await _context.NoteTypes.FindAsync(request.TypeId);
            if (noteType == null)
            {
                return NotFound();
            }

            var editNote = await _context.Notes.FindAsync(id);

            if (id != editNote.Id)
            {
                return BadRequest();
            }

            editNote.Title = request.Title;
            editNote.Description = request.Description;
            editNote.CreatedDate = request.CreatedDate;
            editNote.Type = noteType;
            
            _context.Entry(editNote).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteNoteAsync(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
