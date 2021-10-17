using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Credits;
using DepositKreditApp.Models.ResponseModels.CreditAccounts;

namespace DepositKreditApp.Profiles
{
    public class CreditProfile : Profile
    {
        public CreditProfile()
        {
            CreateMap<CreateCreditRequestModel, CreditAccount>();

            CreateMap<CreditAccount, CreditAccountReponseModel>()
                .ForMember(c => c.PaymentsLeft,
                    opts => opts.MapFrom(c => c.CreditMonthlyPayment.PercentPayment))
                .ForMember(c => c.AccountChart,
                    opts => opts.MapFrom(c => c.AccountChart));
        }
    }
}