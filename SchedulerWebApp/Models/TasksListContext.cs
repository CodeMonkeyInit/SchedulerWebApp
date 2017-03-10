using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SchedulerWebApp.Models
{
    public class TasksListContext : DbContext
    {
        public DbSet<Task> TasksList { get; set; }

        public void AddNewTask(Task task)
        {
            TasksList.Add(task);
            SaveChanges();
        }

        public void RemoveTask(int id)
        {
            Task removingTask = TasksList.Where(task => task.ID == id).FirstOrDefault();
            
            TasksList.Remove(removingTask);
            SaveChanges();
        }

        public void UpdateTask(int id, string updatedDescription)
        {
            Task oldTask = TasksList.Where(task => task.ID == id).FirstOrDefault();
            
            oldTask.Description = updatedDescription;
            SaveChanges();
        }
    }
}