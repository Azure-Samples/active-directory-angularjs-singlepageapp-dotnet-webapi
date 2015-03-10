using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.ActiveDirectory;
using System.Configuration;

namespace TodoSPA
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(
                new WindowsAzureActiveDirectoryBearerAuthenticationOptions
                {
                    MetadataAddress = "https://login.windows-ppe.net/strockisdevthree.ccsctp.net/federationmetadata/2007-06/federationmetadata.xml",
                    Audience = ConfigurationManager.AppSettings["ida:Audience"],
                    Tenant = ConfigurationManager.AppSettings["ida:Tenant"]
                });
        }

    }
}
