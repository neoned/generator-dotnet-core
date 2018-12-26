using Infra.DependencyInjection.Extensions;
using Microsoft.Extensions.DependencyInjection;
using <%= __subsystem %>.<%= __appName %>.WebApi.Client;
using <%= __subsystem %>.<%= __appName %>.WebApi.Client.Abstractions;


namespace Namespace.Extensions.DependencyInjection
{
    public static partial class DependencyInjection
    {
        public static IServiceCollection AddExampleClient(this IServiceCollection collection, string baseAddress)
        {
            return collection.AddApiClient<IExampleClient, ExampleClient>(baseAddress);
        }
    }
}