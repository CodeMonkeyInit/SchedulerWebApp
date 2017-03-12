using System.Data.Entity;
using System.Linq;

namespace SchedulerWebApp.Models
{
    public class TasksListContext : DbContext
    {
        public DbSet<Task> TasksList { get; set; }

        /// <summary>
        /// Добавить новое дело в базу данных
        /// </summary>
        /// <param name="task">Экземпляр класса Task с проинициализорованным полем description</param>
        public void AddNewTask(Task task)
        {
            TasksList.Add(task);
            SaveChanges();
        }

        /// <summary>
        /// Удалить дело из базы данных
        /// </summary>
        /// <param name="id">id удаляемого дела</param>
        public void RemoveTask(int id)
        {
            Task removingTask = TasksList.FirstOrDefault(task => task.ID == id);
            
            TasksList.Remove(removingTask);
            SaveChanges();
        }

        /// <summary>
        /// Обновить существующее дело в базе данных
        /// </summary>
        /// <param name="id">id дела</param>
        /// <param name="updatedDescription">Новое описание</param>
        public void UpdateTask(int id, string updatedDescription)
        {
            Task oldTask = TasksList.FirstOrDefault(task => task.ID == id);
            
            oldTask.Description = updatedDescription;
            SaveChanges();
        }
    }
}