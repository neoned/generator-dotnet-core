using Infra.Application;
using Infra.Http;
using Microsoft.Extensions.Logging;
using <%= __subsystem %>.<%= __appName %>.WebApi.Client.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;

namespace <%= __subsystem %>.<%= __appName %>.WebApi.Client
{
    public class ExampleClient : IExampleClient
    {
        private ApiClient _client;

        public ExampleClient(ILogger<ExampleClient> logger,
                             IApplicationContext context,
                             string serviceBaseAddress)
        {
            _client = new ApiClient(logger, context, serviceBaseAddress);
        }
    }
}
