using System.Threading.Tasks;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Deposits;

namespace DepositKreditApp.Services.Interfaces
{
    public interface IDepositService
    {
        Task<DepositAccount> CreateDeposit(CreateDepositRequestModel model);

        Task<DepositAccount> CloseDeposit(CloseDepositRequestModel model);

        Task<DepositAccount> RechargeDeposit(RechargeDepositInterestRequestModel model);

        Task<DepositAccount> GetDeposit(GetDepositAccountRequestModel model);
    }
}