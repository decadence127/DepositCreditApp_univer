using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.ResponseModels.InterestAccounts;

namespace DepositKreditApp.Profiles
{
    public class InterestAccountProfile : Profile
    {
        public InterestAccountProfile()
        {
            CreateMap<InterestAccount, InterestAccountResponseModel>();
        }
    }
}
