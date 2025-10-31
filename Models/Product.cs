using System;
using System.ComponentModel.DataAnnotations;

namespace EstoqueApi.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
