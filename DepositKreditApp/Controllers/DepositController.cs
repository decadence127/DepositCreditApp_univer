using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Models.RequestModels.Deposits;
using DepositKreditApp.Models.ResponseModels.DepositAccounts;
using DepositKreditApp.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Controllers
{
    [ApiController]
    public class DepositController : ControllerBase
    {
        public IMapper Mapper { get; set; }

        public IDepositService DepositService { get; set; }

        public DepositController(IServiceProvider provider)
        {
            Mapper = provider.GetRequiredService<IMapper>();
            DepositService = provider.GetRequiredService<IDepositService>();
        }

        [HttpGet("Clients/{ClientId}/Deposits/{DepositId}")]
        public async Task<DepositAccountResponseModel> GetDeposit([FromRoute] GetDepositAccountRequestModel model)
        {
            var deposit = await DepositService.GetDeposit(model);

            var responseModel = Mapper.Map<DepositAccountResponseModel>(deposit);
            return responseModel;
        }

        [HttpPost("Clients/{ClientId}/Deposits")]
        public async Task<DepositAccountResponseModel> CreateAccountDeposit([FromForm] CreateDepositRequestModel model)
        {
            var deposit = await DepositService.CreateDeposit(model);

            var responseModel = Mapper.Map<DepositAccountResponseModel>(deposit);
            return responseModel;
        }

        [HttpPost("Clients/{ClientId}/Deposits/{DepositId}/Recharge")]
        public async Task<DepositAccountResponseModel> RechargeDepositInterest([FromRoute] RechargeDepositInterestRequestModel model)
        {
            var deposit = await DepositService.RechargeDeposit(model);

            var responseModel = Mapper.Map<DepositAccountResponseModel>(deposit);
            return responseModel;
        }

        [HttpPost("Clients/{ClientId}/Deposits/{DepositId}/Close")]
        public async Task<DepositAccountResponseModel> CloseDeposit([FromRoute] CloseDepositRequestModel model)
        {
            var deposit = await DepositService.CloseDeposit(model);

            var responseModel = Mapper.Map<DepositAccountResponseModel>(deposit);
            return responseModel;
        }
    }
}