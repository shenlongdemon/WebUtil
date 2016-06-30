using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SchoolService;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace WebUtil.Controllers
{
    [System.Web.Mvc.RoutePrefix("api/school")]
    public class SchoolController : ApiController
    {
        private readonly SchoolServices schoolService = new SchoolServices();
       
        [System.Web.Mvc.Route("getdictricts")]
        [System.Web.Mvc.HttpGet]
        public ActionResult GetDistricts()
        {
            var obj = schoolService.GetDistricts();            
            return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = obj };
        }

        [System.Web.Mvc.Route("getclasses")]
        [System.Web.Mvc.HttpGet]
        public ActionResult GetClasses()
        {
            var obj = schoolService.GetClasses();
            return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.AllowGet, Data = obj };
        }


    }
}
