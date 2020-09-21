using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using myCalendar.Models;
using System;
using System.Linq;

namespace myCalendar.Controllers
{
    public class ApiController: Controller
    {

        private DataContext database;

        public ApiController(DataContext db)
        {
            this.database =db;
        }

       
        [HttpPost]
        public IActionResult CreateTask( [FromBody] Task theTask)
        {
            database.TasksTable.Add(theTask);
            database.SaveChanges();

            return Json(theTask);
        }
         [HttpGet]
        public IActionResult Tasks()

        {
        
        var list = database.TasksTable.ToList();
        return Json(list);
        }
    }
}