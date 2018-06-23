using Infra.AspNetCore.Builder;
using Infra.Consuming.SQS;
using Infra.DependencyInjection.Extensions;
using Infra.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog.Events;

namespace <%= __subsystem %>.<%= __appName %>.Host
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // ################### APP GLOBAL ###################

            services.AddApplicationContext();

            services.ConfigureSerilogLogger(Configuration)
                    .AddSerilogLogger(b =>
                    {
                        b.MinimumLevel.Override("Microsoft", LogEventLevel.Warning);
                        b.MinimumLevel.Override("System", LogEventLevel.Warning);
                    });

            services.ConfigureMongoDb(Configuration)
                    .AddMongoClient()
                    .AddMongoDatabase();

            services.AddSwaggerUI();
            services.AddMvc(opts => opts.Filters.AddModelStateValidation())
                .AddDefaultJsonSettings();
            //.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AddOrUpdateParentRequestValidator>());

            //################### SQS Consumers #####################

            //services.AddSqsConsumer<MessageTypeConsumer, MessageType>(Configuration.Get<SqsConfig>("Messages:MessageType"));

            //################### SQS Publishers ####################

            //services.AddSqsPublisher<MessageType>(Configuration.Get<string>("Messages:MessageType:QueueName"));

            // ################### APP SPECIFIC ###################

            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseFlow();
            app.UseException(env.IsProduction() == false);
            app.UseRequestLog();
            app.UseMvc();
            app.RunSwaggerUI();

            app.EnsureMongoDbIndexes();
        }
    }
}
