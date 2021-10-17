using System.Threading.Tasks;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Credits;

namespace DepositKreditApp.Services.Interfaces
{
    public interface ICreditService
    {
        Task<CreditAccount> CreateCredit(CreateCreditRequestModel model);

        Task<CreditAccount> RepayCredit(RepayCreditRequestModel model);

        Task<CreditAccount> UpdateMonthlyPayment(UpdateMothlyPaymentRequestModel model);

        Task<CreditAccount> GetCredit(GetCreditRequestModel model);
    }
}