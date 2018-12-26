'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const projectName = require('vs_projectname');
// Const guid = require('uuid');

module.exports = class extends Generator {
  _buildTemplateData() {
    this.templatedata = {};

    this.templatedata.__subsystem = projectName(this.namespace);
    this.templatedata.__appName = projectName(this.appName);
    // This.templatedata.guid = guid.v4();
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the crazy ${chalk.red('dotnet-core')} generator!`)
    );

    // Let app = "WebApplication";

    // const prompts = [{
    //   name: 'applicationName',
    //   message: 'What\'s the name of your ASP.NET application?',
    //   default: app
    // }];

    // return this.prompt(prompts).then(props => {
    //   this.applicationName = props.applicationName;
    //   this._buildTemplateData();
    // });
  }

  chooseTemplate() {
    const prompts = [
      {
        type: 'list',
        name: 'template',
        message: 'Choose template from the following list',
        choices: [
          {
            name: 'Web Application (with SQS support & RabbitMQ)',
            value: 'WebApplication'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.template = props.template;
    });
  }

  askNamespace() {
    const prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: "What is the subsystem you're working on?",
      }
    ];

    return this.prompt(prompts).then(props => {
      this.namespace = props.namespace;
    });
  }

  askName() {
    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is your project name?',
      }
    ];

    return this.prompt(prompts).then(props => {
      this.appName = props.appName;
    });
  }

  _copyGlobalFiles(){
    this.fs.copyTpl(
      this.templatePath(this.template, `Namespace.ApplicationName.sln`),
      this.destinationPath(
        this.appName,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.sln`
      ),
      this.templatedata
    );

    // this.fs.copyTpl(
    //   this.templatePath(this.template, `docker-compose.yml`),
    //   this.destinationPath(this.appName, `docker-compose.yml`),
    //   this.templatedata
    // );

    // this.fs.copyTpl(
    //   this.templatePath(this.template, `docker-compose.dcproj`),
    //   this.destinationPath(this.appName, `docker-compose.dcproj`),
    //   this.templatedata
    // );

    this.fs.copyTpl(
      this.templatePath(this.template, `gitignore`),
      this.destinationPath(this.appName, `.gitignore`),
      this.templatedata
    );

    this.fs.copyTpl(
      this.templatePath(this.template, `.dockerignore`),
      this.destinationPath(this.appName, `.dockerignore`),
      this.templatedata
    );

  }

  _copyDomain(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Domain`,
        `Namespace.ApplicationName.Domain.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Domain`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Domain.csproj`
      ),
      this.templatedata
    );
  }

  _copyDomainAbstractions(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Domain.Abstractions`,
        `Namespace.ApplicationName.Domain.Abstractions.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Domain.Abstractions`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Domain.Abstractions.csproj`
      ),
      this.templatedata
    );
  }

  _copyDomainEntities(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Domain.Entities`,
        `Namespace.ApplicationName.Domain.Entities.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Domain.Entities`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Domain.Entities.csproj`
      ),
      this.templatedata
    );
  }

  _copyMessages(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Messages`,
        `Namespace.ApplicationName.Messages.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Messages`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Messages.csproj`
      ),
      this.templatedata
    );
  }

  _copyMessaging(){
    
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Messaging`,
        `Namespace.ApplicationName.Messaging.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Messaging`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Messaging.csproj`
      ),
      this.templatedata
    );
  }
  
  _copyRepositoryAbstractions(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Repository.Abstractions`,
        `Namespace.ApplicationName.Repository.Abstractions.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Repository.Abstractions`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Repository.Abstractions.csproj`
      ),
      this.templatedata
    );
  }

  _copyRepositoryMongo(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Repository.Mongo`,
        `Namespace.ApplicationName.Repository.Mongo.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Repository.Mongo`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.Repository.Mongo.csproj`
      ),
      this.templatedata
    );
  }

  _copyHost(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Host`,
        `Namespace.ApplicationName.Host.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host.csproj`
      ),
      this.templatedata
    );

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Host`,
        `Properties`,
        `launchSettings.json`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host`,
        `Properties`,
        `launchSettings.json`
      ),
      this.templatedata
    );

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Host`,
        `appsettings.json`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host`,
        `appsettings.json`
      ),
      this.templatedata
    );

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Host`,
        `Dockerfile`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host`,
        `Dockerfile`
      ),
      this.templatedata
    );

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Host`,
        `Program.cs`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host`,
        `Program.cs`
      ),
      this.templatedata
    );

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.Host`,
        `Startup.cs`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${this.templatedata.__appName}.Host`,
        `Startup.cs`
      ),
      this.templatedata
    );
  }

  _copyWebApi(){
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.WebApi`,
        `Namespace.ApplicationName.WebApi.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.csproj`
      ),
      this.templatedata
    );
  }

  _copyWebApiClient(){

    //CS PROJ
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.WebApi.Client`,
        `Namespace.ApplicationName.WebApi.Client.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.Client`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.Client.csproj`
      ),
      this.templatedata
    );

    //IEXampleClient

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.WebApi.Client`,
        `Abstractions`,
        `IExampleClient.cs`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.Client`,
        `Abstractions`,
        `IExampleClient.cs`
      ),
      this.templatedata
    );

    //ExampleClient.cs
    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.WebApi.Client`,
        `ExampleClient.cs`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.Client`,
        `ExampleClient.cs`
      ),
      this.templatedata
    );

  }

  _copyWebApiContract(){

    this.fs.copyTpl(
      this.templatePath(
        this.template,
        `src`,
        `Namespace.ApplicationName.WebApi.Contracts`,
        `Namespace.ApplicationName.WebApi.Contracts.csproj`
      ),
      this.destinationPath(
        this.appName,
        `src`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.Contracts`,
        `${this.templatedata.__subsystem}.${
          this.templatedata.__appName
        }.WebApi.Contracts.csproj`
      ),
      this.templatedata
    );
  }

  writing() {
    this._buildTemplateData();

    this._copyGlobalFiles();

    this._copyDomain();

    this._copyDomainAbstractions();
   
    this._copyDomainEntities();

    this._copyMessages();

    this._copyMessaging();
    
    this._copyRepositoryAbstractions();

    this._copyRepositoryMongo();

    this._copyHost();

    this._copyWebApi();

    this._copyWebApiClient();

    this._copyWebApiContract();
  }
};
