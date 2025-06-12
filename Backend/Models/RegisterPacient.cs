
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    [Table("RegisterPacients")]
    public class RegisterPacient : IdentityUser
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public string Email { get; set; }

        [Required]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? Address { get; set; }

        public string? City { get; set; }
        
    }
}

