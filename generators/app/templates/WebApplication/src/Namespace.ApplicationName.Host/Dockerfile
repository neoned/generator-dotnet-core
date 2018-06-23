FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY src/<%= __subsystem %>.<%= __appName %>.Host/<%= __subsystem %>.<%= __appName %>.Host.csproj src/<%= __subsystem %>.<%= __appName %>.Host/
COPY src/<%= __subsystem %>.<%= __appName %>.Repository.Mongo/<%= __subsystem %>.<%= __appName %>.Repository.Mongo.csproj src/<%= __subsystem %>.<%= __appName %>.Repository.Mongo/
COPY src/<%= __subsystem %>.<%= __appName %>.Repository.Abstractions/<%= __subsystem %>.<%= __appName %>.Repository.Abstractions.csproj src/<%= __subsystem %>.<%= __appName %>.Repository.Abstractions/
COPY src/<%= __subsystem %>.<%= __appName %>.Domain/<%= __subsystem %>.<%= __appName %>.Domain.csproj src/<%= __subsystem %>.<%= __appName %>.Domain/
COPY src/<%= __subsystem %>.<%= __appName %>.Domain.Entities/<%= __subsystem %>.<%= __appName %>.Domain.Entities.csproj src/<%= __subsystem %>.<%= __appName %>.Domain.Entities/
COPY src/<%= __subsystem %>.<%= __appName %>.Domain.Abstractions/<%= __subsystem %>.<%= __appName %>.Domain.Abstractions.csproj src/<%= __subsystem %>.<%= __appName %>.Domain.Abstractions/
RUN dotnet restore src/<%= __subsystem %>.<%= __appName %>.Host/<%= __subsystem %>.<%= __appName %>.Host.csproj
COPY . .
WORKDIR /src/src/<%= __subsystem %>.<%= __appName %>.Host
RUN dotnet build <%= __subsystem %>.<%= __appName %>.Host.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish <%= __subsystem %>.<%= __appName %>.Host.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "<%= __subsystem %>.<%= __appName %>.Host.dll"]
