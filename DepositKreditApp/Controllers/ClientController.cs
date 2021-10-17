using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Filters;
using DepositKreditApp.Models.RequestModels.Clients;
using DepositKreditApp.Models.ResponseModels.Clients;
using DepositKreditApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Controllers
{
    [ApiController]
    [Route("Clients")]
    public class ClientController : ControllerBase
    {
        public IMapper Mapper { get; set; }

        public IClientService ClientService { get; set; }

        public MsSqlContext SqlContext { get; set; }

        public ClientController(IServiceProvider provider)
        {
            ClientService = provider.GetRequiredService<IClientService>();
            Mapper = provider.GetRequiredService<IMapper>();
            SqlContext = provider.GetRequiredService<MsSqlContext>();
        }

        [HttpPost]
        public async Task<ClientResponseModel> CreateClient([FromForm] CreateClientRequestModel model)
        {
            var client = await ClientService.CreateClient(model);

            var responseModel = Mapper.Map<ClientResponseModel>(client);
            return responseModel;
        }

        [HttpGet("{Id}")]
        public async Task<ClientResponseModel> GetClientHistory([FromQuery] GetClientHistoryRequestModel model)
        {
            var client = await ClientService.GetClientHistory(model.Id, model.ShowClosedAccounts);

            var responseModel = Mapper.Map<ClientResponseModel>(client);
            return responseModel;
        }

        [HttpPost("{Id}/AppendBalance")]
        public async Task<bool> AppendClientBalance([FromForm] AppendClientBalanceRequestModel model)
        {
            var client = await SqlContext.Clients.FirstOrDefaultAsync(c => c.Id == model.Id && c.PIN == model.Pin);

            if (client == null)
            {
                return false;
            }

            client.Balance += model.TotalSum;
            await SqlContext.SaveChangesAsync();

            return true;
        }

        [HttpPost("{Id}/SubstractBalance")]
        public async Task<bool> SubstractClientBalance([FromForm] SubstractClientBalanceRequestModel model)
        {
            var client = await SqlContext.Clients.FirstOrDefaultAsync(c => c.Id == model.Id && c.PIN == model.Pin);

            if (client == null)
            {
                return false;
            }

            if (model.TotalSum <= 0 || client.Balance < model.TotalSum)
            {
                throw new AppException("Снимаемая сумма не должна превышать баланс и быть <= 0");
            }

            client.Balance -= model.TotalSum;
            await SqlContext.SaveChangesAsync();

            return true;
        }
    }
}