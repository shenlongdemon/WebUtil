using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WebUtil
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
              name: "SchoolApi",
              routeTemplate: "api/{controller}/{action}/{id}",
              defaults: new
              {                  
                  action = RouteParameter.Optional,
                   id = RouteParameter.Optional
              }
           );
           
        }
    }
}
