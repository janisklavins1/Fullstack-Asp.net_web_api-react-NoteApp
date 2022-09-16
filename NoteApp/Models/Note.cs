using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoteApp.Models
{
    public class Note
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public string CreatedDate { get; set; }
        public NoteType Type { get; set; }
        [JsonIgnore]
        public int TypeId { get; set; }
    }
}
