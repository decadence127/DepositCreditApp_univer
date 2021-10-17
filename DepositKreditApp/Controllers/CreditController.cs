using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Models.RequestModels.Credits;
using DepositKreditApp.Models.ResponseModels.CreditAccounts;
using DepositKreditApp.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Controllers
{
    [ApiController]
    public class CreditController : ControllerBase
    {
        public ICreditService CreditService { get; set; }

        public IMapper Mapper { get; set; }

        public CreditController(IServiceProvider provider)
        {
            CreditService = provider.GetRequiredService<ICreditService>();
            Mapper = provider.GetRequiredService<IMapper>();
        }

        [HttpPost("Clients/{ClientId}/Credits")]
        public async Task<CreditAccountReponseModel> CreateCredit([FromForm] CreateCreditRequestModel model)
        {
            var credit = await CreditService.CreateCredit(model);

            var responseModel = Mapper.Map<CreditAccountReponseModel>(credit);
            return responseModel;
        }

        [HttpPost("Clients/{ClientId}/Credits/{CreditId}/Pay")]
        public async Task<CreditAccountReponseModel> RepayCredit([FromForm] RepayCreditRequestModel model)
        {
            var credit = await CreditService.RepayCredit(model);

            var responseModel = Mapper.Map<CreditAccountReponseModel>(credit);
            return responseModel;
        }

        [HttpPost("Clients/{ClientId}/Credits/{CreditId}/Recharge")]
        public async Task<CreditAccountReponseModel> UpdateMonthlyPayment([FromRoute] UpdateMothlyPaymentRequestModel model)
        {
            var credit = await CreditService.UpdateMonthlyPayment(model);

            var responseModel = Mapper.Map<CreditAccountReponseModel>(credit);
            return responseModel;
        }

        [HttpGet("Clients/{ClientId}/Credits/{CreditId}")]
        public async Task<CreditAccountReponseModel> GetCredit([FromRoute] GetCreditRequestModel model)
        {
            var credit = await CreditService.GetCredit(model);

            var responseModel = Mapper.Map<CreditAccountReponseModel>(credit);
            return responseModel;
        }
    }
}