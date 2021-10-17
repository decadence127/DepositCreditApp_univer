using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.ResponseModels.CreditMonthlyPayment;

namespace DepositKreditApp.Profiles
{
    public class MonthlyPaymentProfile : Profile
    {
        public MonthlyPaymentProfile()
        {
            CreateMap<CreditMonthlyPayment, MonthlyPaymentResponseModel>();
        }
    }
}