using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Helper;
using DepositKreditApp.Models.RequestModels.Clients;
using DepositKreditApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Services
{
    public class ClientService : IClientService
    {
        public MsSqlContext SqlContext { get; set; }

        public IMapper Mapper { get; set; }

        public ClientService(IServiceProvider provider)
        {
            SqlContext = provider.GetRequiredService<MsSqlContext>();
            Mapper = provider.GetRequiredService<IMapper>();
        }

        public async Task<List<Client>> GetClientsList(Guid bankId)
        {
            return await SqlContext.Clients
                        .Include(c => c.DepositAccounts).ThenInclude(d => d.InterestAccount)
                        .Include(c => c.DepositAccounts).ThenInclude(d => d.AccountChart)
                        .Include(c => c.CreditAccounts).ThenInclude(c => c.CreditMonthlyPayment)
                        .Include(c => c.CreditAccounts).ThenInclude(c => c.AccountChart)
                        .Include(c => c.Bank).Where(c => c.Bank.Id == bankId).ToListAsync();
        }

        public async Task<Client> CreateClient(CreateClientRequestModel model)
        {
            var bank = await SqlContext.Banks.FirstOrDefaultAsync(b => b.Id == model.BankId);

            if (bank == null)
            {
                throw new Exception("Bank not found");
            }

            var client = Mapper.Map<Client>(model);
            client.Bank = bank;
            client.PIN = Randomizer.GeneratePIN();

            SqlContext.Clients.Add(client);
            await SqlContext.SaveChangesAsync();

            return client;
        }

        public async Task<Client> GetClientHistory(Guid clientId, bool showClosedAccounts)
        {
            var clientInfo = await SqlContext.Clients.Include(c => c.DepositAccounts)
                .ThenInclude(d => d.InterestAccount)
                .Include(c => c.DepositAccounts).ThenInclude(d => d.AccountChart)
                .Include(c => c.CreditAccounts).ThenInclude(c => c.CreditMonthlyPayment)
                .Include(c => c.CreditAccounts).ThenInclude(c => c.AccountChart)
                .FirstOrDefaultAsync(c => c.Id == clientId);

            if (!showClosedAccounts)
            {
                clientInfo.DepositAccounts = clientInfo.DepositAccounts.Select(d => d)
                    .Where(d => d.IsActive).ToList();

                clientInfo.CreditAccounts = clientInfo.CreditAccounts.Select(c => c)
                    .Where(c => c.IsActive).ToList();
            }

            return clientInfo;
        }
    }
}
