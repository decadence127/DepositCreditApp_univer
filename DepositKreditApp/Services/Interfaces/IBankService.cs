using System.Collections.Generic;
using System.Threading.Tasks;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Banks;

namespace DepositKreditApp.Services.Interfaces
{
    public interface IBankService
    {
        Task<Bank> CreateBank(CreateBankRequestModel model);

        Task<List<Bank>> GetBanksList();
    }
}