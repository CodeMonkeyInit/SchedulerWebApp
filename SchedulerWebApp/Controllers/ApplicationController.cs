using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using SchedulerWebApp.Models;
using System.Data.Entity.Validation;

namespace SchedulerWebApp.Controllers
{
    [RoutePrefix("")]
    public class ApplicationController : Controller
    {
        [HttpPost]
        [Route("add/")]
        public bool AddTask(string description)
        {
            Task newTask;
            bool successfull;

            if (ModelState.IsValid && !string.IsNullOrWhiteSpace(description))
            {
                try
                {
                    using (TasksListContext context = new TasksListContext())
                    {
                        newTask = new Task(description);

                        context.AddNewTask(newTask);
                        successfull = true;
                    }
                }
                catch (Exception)
                {
                    successfull = false;
                }
            }
            else
            {
                successfull = false;
            }

            return successfull;
        }

        [HttpPost]
        [Route("remove/")]
        public bool RemoveTask(int id)
        {
            bool isSuccessfull;

            if (ModelState.IsValid)
            {
                try
                {
                    using (TasksListContext context = new TasksListContext())
                    {
                        context.RemoveTask(id);
                        isSuccessfull = true;
                    }
                }
                catch (Exception)
                {
                    isSuccessfull = false;
                }
            }
            else
            {
                isSuccessfull = false;
            }

            return isSuccessfull;
        }

        [HttpPost]
        [Route("update/")]
        public bool UpdateTask(int id, string updatedDescription)
        {
            bool isSuccessfull;

            if (ModelState.IsValid && !string.IsNullOrWhiteSpace(updatedDescription))
            {
                try
                {
                    using (TasksListContext context = new TasksListContext())
                    {
                        context.UpdateTask(id, updatedDescription);
                        isSuccessfull = true;
                    }
                }
                catch (Exception)
                {
                    isSuccessfull = false;
                }
            }
            else
            {
                isSuccessfull = false;
            }

            return isSuccessfull;
        }

        [HttpPost]
        [Route("view/")]
        public ActionResult ViewTasks()
        {
            List<Task> tasks;
            using (TasksListContext context = new TasksListContext())
            {
                tasks = context.TasksList.ToList();
                return PartialView("_TasksList", tasks);
            }
            
        }
        [Route]
        public ActionResult Index()
        {
            using (TasksListContext context = new TasksListContext())
            {
                List<Task> tasks = context.TasksList.ToList<Task>();
                return View(tasks);
            }
        }
    }
}