using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.ResponseModels.AccountCharts;

namespace DepositKreditApp.Profiles
{
    public class AccountChartProfile : Profile
    {
        public AccountChartProfile()
        {
            CreateMap<AccountChart, AccountChartResponseModel>();
        }
    }
}