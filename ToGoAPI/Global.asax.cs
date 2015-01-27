using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ToGoAPI.DAL;

namespace ToGoAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Database.SetInitializer<ToGoListServiceContext>(new ToGoListServiceInitializer());
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
