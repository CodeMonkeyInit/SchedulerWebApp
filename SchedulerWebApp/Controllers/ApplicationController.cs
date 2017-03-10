using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using SchedulerWebApp.Models;
using System.Net;

namespace SchedulerWebApp.Controllers
{
    [RoutePrefix("")]
    public class ApplicationController : Controller
    {
        private IEnumerable<Task> GetTasks()
        {
            using (TasksListContext context = new TasksListContext())
            {
                return context.TasksList.ToList();
            }
        }

        [HttpPost]
        [Route("add/")]
        public ActionResult AddTask(string description)
        {
            Task newTask;
            ActionResult operationResult;

            if (ModelState.IsValid && !string.IsNullOrWhiteSpace(description))
            {
                try
                {
                    using (TasksListContext context = new TasksListContext())
                    {
                        newTask = new Task(description);

                        context.AddNewTask(newTask);
                        operationResult = new HttpStatusCodeResult(HttpStatusCode.OK);
                    }
                }
                catch (Exception)
                {
                    operationResult = new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                operationResult = new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return operationResult;
        }

        [HttpPost]
        [Route("remove/")]
        public ActionResult RemoveTask(int id)
        {
            ActionResult operationResult;

            if (ModelState.IsValid)
            {
                try
                {
                    using (TasksListContext context = new TasksListContext())
                    {
                        context.RemoveTask(id);
                        operationResult = new HttpStatusCodeResult(HttpStatusCode.OK);
                    }
                }
                catch (Exception)
                {
                    operationResult = new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                operationResult = new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return operationResult;
        }

        [HttpPost]
        [Route("update/")]
        public ActionResult UpdateTask(int id, string updatedDescription)
        {
            ActionResult operationResult;

            if (ModelState.IsValid && !string.IsNullOrWhiteSpace(updatedDescription))
            {
                try
                {
                    using (TasksListContext context = new TasksListContext())
                    {
                        context.UpdateTask(id, updatedDescription);
                        operationResult = new HttpStatusCodeResult(HttpStatusCode.OK);
                    }
                }
                catch (Exception)
                {
                    operationResult = new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                operationResult = new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return operationResult;
        }
        
        [Route("view/")]
        public ActionResult ViewTasks()
        {
            IEnumerable<Task> tasks;

            try
            {
                tasks = GetTasks();
            }
            catch (Exception)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
            }
            return PartialView("_TasksList", tasks);
        }

        [Route]
        public ActionResult Index()
        {
            IEnumerable<Task> tasks;

            try
            {
                tasks = GetTasks();
            }
            catch (Exception)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError);
            }
            return View(tasks);
        }
    }
}