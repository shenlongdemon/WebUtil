using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SchoolService;
using System.Web.Mvc;
using Newtonsoft.Json;
using Commons;

namespace WebUtil.Controllers
{
  
    public class SchoolController : ApiController
    {
        private readonly SchoolServices schoolService = new SchoolServices();
       
        [System.Web.Mvc.Route("GetDistricts")]
        [System.Web.Mvc.ActionName("GetDistricts")]
        [System.Web.Mvc.HttpGet]
        public ActionResult GetDistricts()
        {
            var obj = schoolService.GetDistricts();            
            return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = obj };
        }

        [System.Web.Mvc.Route("GetClasses")]
        [System.Web.Mvc.ActionName("GetClasses")]
        [System.Web.Mvc.HttpGet]
        public ActionResult GetClasses()
        {
            var obj = schoolService.GetClasses();
            return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = obj };
        }

        [System.Web.Mvc.Route("GetChildren")]
        [System.Web.Mvc.ActionName("GetChildren")]
        [System.Web.Mvc.HttpGet]
        public ActionResult GetChildren(int page, int perPage, string sortBy, bool isAsc)
        {
            ResponseList obj = schoolService.GetChildren(page, perPage, sortBy, isAsc);
            return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = obj };
        }
    }
}
