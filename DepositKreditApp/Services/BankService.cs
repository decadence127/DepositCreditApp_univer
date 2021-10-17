using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Models.RequestModels.Banks;
using DepositKreditApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Services
{
    public class BankService : IBankService
    {
        public IMapper Mapper { get; set; }

        public MsSqlContext SqlContext { get; set; }

        public BankService(IServiceProvider provider)
        {
            Mapper = provider.GetRequiredService<IMapper>();
            SqlContext = provider.GetRequiredService<MsSqlContext>();
        }

        public async Task<Bank> CreateBank(CreateBankRequestModel model)
        {
            var bank = Mapper.Map<Bank>(model);

            SqlContext.Banks.Add(bank);
            await SqlContext.SaveChangesAsync();

            return bank;
        }

        public async Task<List<Bank>> GetBanksList()
        {
            var banks = await SqlContext.Banks.ToListAsync();

            return banks;
        }
    }
}