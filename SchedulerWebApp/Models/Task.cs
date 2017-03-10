using System;
using System.ComponentModel.DataAnnotations;

namespace SchedulerWebApp.Models
{
    public class Task
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(255)]
        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public bool Finished { get; set; }

        public Task(string description)
        {
            Description = description;
            DateCreated = DateTime.Now;
            Finished = false;
        }

        public Task() {}
    }
}