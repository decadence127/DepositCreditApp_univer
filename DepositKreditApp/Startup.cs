using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DepositKreditApp.Database;
using DepositKreditApp.Filters;
using DepositKreditApp.Services;
using DepositKreditApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DepositKreditApp
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
            services.AddCors(o => o.AddPolicy("ReactPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddControllers();
            services.AddSwaggerGen();

            services.AddMvc(mvcOptions =>
            {
                mvcOptions.Filters.Add(typeof(ExceptionFilter));
                mvcOptions.EnableEndpointRouting = false;
            });

            services.AddDbContext<MsSqlContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("MsSqlConnectionString"));
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IBankService, BankService>();
            services.AddScoped<IDepositService, DepositService>();
            services.AddScoped<ICreditService, CreditService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("ReactPolicy");
            app.UseHttpsRedirection();

            app.UseMvcWithDefaultRoute();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
    }
}