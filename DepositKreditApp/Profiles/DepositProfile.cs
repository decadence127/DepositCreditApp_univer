using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Deposits;
using DepositKreditApp.Models.ResponseModels.DepositAccounts;

namespace DepositKreditApp.Profiles
{
    public class DepositProfile : Profile
    {
        public DepositProfile()
        {
            CreateMap<CreateDepositRequestModel, DepositAccount>();

            CreateMap<DepositAccount, DepositAccountResponseModel>()
                .ForMember(d => d.AccountChart, opts => opts.MapFrom(d => d.AccountChart))
                .ForMember(d => d.InterestAccount, opts => opts.MapFrom(d => d.InterestAccount));
        }
    }
}
