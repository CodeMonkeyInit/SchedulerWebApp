using System.Data.Entity;
using System.Linq;

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
            Task removingTask = TasksList.FirstOrDefault(task => task.ID == id);
            
            TasksList.Remove(removingTask);
            SaveChanges();
        }

        public void UpdateTask(int id, string updatedDescription)
        {
            Task oldTask = TasksList.FirstOrDefault(task => task.ID == id);
            
            oldTask.Description = updatedDescription;
            SaveChanges();
        }
    }
}