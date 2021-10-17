using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Clients;
using DepositKreditApp.Models.ResponseModels.Clients;

namespace DepositKreditApp.Profiles
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<CreateClientRequestModel, Client>();

            CreateMap<Client, ClientResponseModel>()
                .ForMember(c => c.DepositAccounts, 
                    opts => opts.MapFrom(c => c.DepositAccounts))
                .ForMember(c => c.CreditAccounts, 
                    opts => opts.MapFrom(c => c.CreditAccounts));
        }
    }
}