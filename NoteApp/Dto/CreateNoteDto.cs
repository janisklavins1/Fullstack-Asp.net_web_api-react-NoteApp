using System.ComponentModel.DataAnnotations;

namespace NoteApp.Dto
{
    public class CreateNoteDto
    {
        public string Title { get; set; } = "Tresais";
        public string Description { get; set; } = "Cetu asd asd asdvjdfasjj sdfsdf";
        public string CreatedDate { get; set; } = string.Empty;
        public int TypeId { get; set; } = 1;
    }
}
