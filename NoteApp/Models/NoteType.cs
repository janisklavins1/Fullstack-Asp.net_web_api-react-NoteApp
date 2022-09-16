using System.Text.Json.Serialization;

namespace NoteApp.Models
{
    public class NoteType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public ICollection<Note> Notes { get; set; }
    }
}
