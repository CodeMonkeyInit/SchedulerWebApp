using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SchedulerWebApp.Startup))]
namespace SchedulerWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

        }
    }
}
