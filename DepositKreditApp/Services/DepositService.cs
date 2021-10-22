using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Enums;
using DepositKreditApp.Filters;
using DepositKreditApp.Models.RequestModels.Deposits;
using DepositKreditApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Services
{
    public class DepositService : IDepositService
    {
        public MsSqlContext SqlContext { get; set; }

        public IMapper Mapper { get; set; }

        public DepositService(IServiceProvider provider)
        {
            SqlContext = provider.GetRequiredService<MsSqlContext>();
            Mapper = provider.GetRequiredService<IMapper>();
        }

        public async Task<DepositAccount> CreateDeposit(CreateDepositRequestModel model)
        {
            var client = await SqlContext.Clients.Include(c => c.Bank).FirstOrDefaultAsync(c => c.Id == model.ClientId);

            if (client == null)
            {
                throw new AppException("Client was not found");
            }

            if (client.Balance < model.DepositBalance)
            {
                throw new AppException("Баланс клиента меньше вкладываемого депозита");
            }

            var accountChart = await SqlContext.AccountCharts.FirstOrDefaultAsync(c => c.Id == model.AccountChartId && c.AccountType == AccountType.Deposit);

            if (accountChart == null)
            {
                throw new AppException("Account chart was not found");
            }

            var deposit = Mapper.Map<DepositAccount>(model);

            deposit.IsActive = deposit.ActiveBefore > DateTime.Now;
            deposit.AccountChart = accountChart;

            var interestId = Guid.NewGuid();
            deposit.InterestAccount = new InterestAccount()
            {
                Id = interestId,
                BalanceCharge = 0
            };

            deposit.InterestAccountId = interestId;
            deposit.Client = client;

            client.Bank.Balance += deposit.DepositBalance;
            client.Balance -= deposit.DepositBalance;

            SqlContext.DepositAccounts.Add(deposit);
            await SqlContext.SaveChangesAsync();

            return deposit;
        }

        public async Task<DepositAccount> CloseDeposit(CloseDepositRequestModel model)
        {
            var deposit = await SqlContext.DepositAccounts.Include(d => d.Client)
                .ThenInclude(c => c.Bank)
                .Include(d => d.InterestAccount)
                .Include(d => d.AccountChart)
                .FirstOrDefaultAsync(d => d.Id == model.DepositId && d.Client.Id == model.ClientId);

            if (deposit == null || !deposit.IsActive)
            {
                throw new AppException("Данный депозит не найден, либо его срок действия окончен");
            }

            double totalDepositBalance = deposit.DepositBalance + deposit.InterestAccount.BalanceCharge;

            deposit.Client.Balance += totalDepositBalance;
            deposit.Client.Bank.Balance -= totalDepositBalance;

            deposit.IsActive = false;

            await SqlContext.SaveChangesAsync();

            return deposit;
        }

        public async Task<DepositAccount> RechargeDeposit(RechargeDepositInterestRequestModel model)
        {
            var deposit = await SqlContext.DepositAccounts.Include(d => d.Client)
                .Include(d => d.InterestAccount)
                .Include(d => d.AccountChart)
                .FirstOrDefaultAsync(d => d.Id == model.DepositId && d.Client.Id == model.ClientId);

            if (deposit == null || !deposit.IsActive)
            {
                throw new AppException("Данный депозит не найден, либо его срок действия окончен");
            }

            double totalDepositBalance = deposit.DepositBalance;

            if (deposit.AccountChart.UsePercentInRecharging)
            {
                totalDepositBalance += deposit.InterestAccount.BalanceCharge;
            }

            double income = (totalDepositBalance * deposit.AccountChart.AccountingPercent) / 100;
            deposit.InterestAccount.BalanceCharge += income;

            await SqlContext.SaveChangesAsync();

            return deposit;
        }

        public async Task<DepositAccount> GetDeposit(GetDepositAccountRequestModel model)
        {
            var deposit = await SqlContext.DepositAccounts.Include(d => d.Client)
                .ThenInclude(c => c.Bank)
                .Include(d => d.InterestAccount)
                .Include(d => d.AccountChart)
                .FirstOrDefaultAsync(d => d.Id == model.DepositId && d.Client.Id == model.ClientId);

            if (deposit.IsActive && deposit.ActiveBefore < DateTime.Now)
            {
                double totalDepositBalance = deposit.DepositBalance + deposit.InterestAccount.BalanceCharge;

                deposit.Client.Balance += totalDepositBalance;
                deposit.Client.Bank.Balance -= totalDepositBalance;

                deposit.IsActive = false;

                await SqlContext.SaveChangesAsync();
            }

            return deposit;
        }
    }
}