using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Models.RequestModels.Banks;
using DepositKreditApp.Models.ResponseModels.Banks;
using DepositKreditApp.Models.ResponseModels.Clients;
using DepositKreditApp.Services;
using DepositKreditApp.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Controllers
{
    [ApiController]
    [Route("Bank")]
    public class BankController : ControllerBase
    {
        public IBankService BankService { get; set; }

        public IClientService ClientService { get; set; }

        public IMapper Mapper { get; set; }

        public BankController(IServiceProvider provider)
        {
            BankService = provider.GetRequiredService<IBankService>();
            ClientService = provider.GetRequiredService<IClientService>();
            Mapper = provider.GetRequiredService<IMapper>();
        }

        [HttpPost]
        public async Task<BankResponseModel> CreateBank([FromForm] CreateBankRequestModel model)
        {
            var bank = await BankService.CreateBank(model);

            var responseModel = Mapper.Map<BankResponseModel>(bank);

            return responseModel;
        }

        [HttpGet]
        public async Task<List<BankResponseModel>> GetBanksList()
        {
            var banks = await BankService.GetBanksList();

            var responseModel = Mapper.Map<List<BankResponseModel>>(banks);

            return responseModel;
        }

        [HttpGet("/{BankId}/Clients")]
        public async Task<List<ClientResponseModel>> GetBankClients([FromRoute] GetClientsListRequestModel model)
        {
            var clients = await ClientService.GetClientsList(model.BankId);

            var responseModel = Mapper.Map<List<ClientResponseModel>>(clients);

            return responseModel;
        }
    }
}