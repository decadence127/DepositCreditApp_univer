using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Clients;

namespace DepositKreditApp.Services.Interfaces
{
    public interface IClientService
    {
        Task<List<Client>> GetClientsList(Guid bankId);

        Task<Client> CreateClient(CreateClientRequestModel model);

        Task<Client> GetClientHistory(Guid clientId, bool showClosedAccounts);
    }
}