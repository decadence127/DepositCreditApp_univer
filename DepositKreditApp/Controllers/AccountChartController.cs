using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.ResponseModels.AccountCharts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Controllers
{
    [ApiController]
    [Route("AccountCharts")]
    public class AccountChartController : ControllerBase
    {
        public MsSqlContext SqlContext { get; set; }

        public IMapper Mapper { get; set; }

        public AccountChartController(IServiceProvider provider)
        {
            SqlContext = provider.GetRequiredService<MsSqlContext>();
            Mapper = provider.GetRequiredService<IMapper>();
        }

        [HttpGet]
        public async Task<List<AccountChartResponseModel>> GetAccountChartsList()
        {
            var accountCharts = await SqlContext.AccountCharts.ToListAsync();

            var responseModel = Mapper.Map<List<AccountChartResponseModel>>(accountCharts);
            return responseModel;
        }
    }
}