using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Banks;
using DepositKreditApp.Models.ResponseModels.Banks;

namespace DepositKreditApp.Profiles
{
    public class BankProfile : Profile
    {
        public BankProfile()
        {
            CreateMap<CreateBankRequestModel, Bank>();

            CreateMap<Bank, BankResponseModel>()
                .ForMember(b => b.AccountCharts, opts => opts.MapFrom(b => b.AccountCharts));
        }

    }
}
