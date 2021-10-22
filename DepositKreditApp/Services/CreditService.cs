using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DepositKreditApp.Database;
using DepositKreditApp.Enums;
using DepositKreditApp.Filters;
using DepositKreditApp.Models.RequestModels.Credits;
using DepositKreditApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DepositKreditApp.Services
{
    public class CreditService : ICreditService
    {
        public MsSqlContext SqlContext { get; set; }

        public IMapper Mapper { get; set; }

        public CreditService(IServiceProvider provider)
        {
            SqlContext = provider.GetRequiredService<MsSqlContext>();
            Mapper = provider.GetRequiredService<IMapper>();
        }

        public async Task<CreditAccount> CreateCredit(CreateCreditRequestModel model)
        {
            var client = await SqlContext.Clients.Include(c => c.Bank).FirstOrDefaultAsync(c => c.Id == model.ClientId);

            if (client == null)
            {
                throw new AppException("Client not found");
            }

            double totalMonths = (model.ActiveBefore - DateTime.Now).TotalDays / 31;
            if (client.MonthlyIncome * totalMonths / 7 < model.CreditBalance)
            {
                throw new AppException("Вам не может быть выдан кредит из-за неплатежеспособности");
            }

            var accountChart = await SqlContext.AccountCharts.FirstOrDefaultAsync(a => a.Id == model.AccountChartId && a.AccountType == AccountType.Credit);

            if (accountChart == null)
            {
                throw new AppException("Account chart was not found");
            }

            var creditAccount = Mapper.Map<CreditAccount>(model);

            var monthlyId = Guid.NewGuid();
            creditAccount.CreditMonthlyPayment = new CreditMonthlyPayment()
            {
                MonthlyPayment = model.CreditBalance / totalMonths,
                Id = monthlyId,
                PercentPayment = 0
            };

            creditAccount.CreditMonthlyPaymentId = monthlyId;
            creditAccount.IsActive = true;

            creditAccount.AccountChart = accountChart;

            client.Balance += model.CreditBalance;
            client.Bank.Balance -= model.CreditBalance;

            creditAccount.Client = client;

            SqlContext.CreditAccounts.Add(creditAccount);
            await SqlContext.SaveChangesAsync();

            return creditAccount;
        }

        public async Task<CreditAccount> RepayCredit(RepayCreditRequestModel model)
        {
            if (model.Payment <= 0)
            {
                throw new AppException("Платеж не может быть <= 0!!!!!!");
            }

            var credit = await SqlContext.CreditAccounts.Include(c => c.AccountChart)
                                .Include(c => c.Client).ThenInclude(c => c.Bank)
                                .Include(c => c.CreditMonthlyPayment)
                                .FirstOrDefaultAsync(c => c.Id == model.CreditId && c.Client.Id == model.ClientId);

            if (credit == null || !credit.IsActive)
            {
                throw new AppException("Кредит не был найден или же он закрыт");
            }

            double payingSize = credit.CreditMonthlyPayment.PercentPayment < model.Payment
                ? credit.CreditMonthlyPayment.PercentPayment
                : model.Payment;

            credit.CreditMonthlyPayment.PercentPayment -= payingSize;

            credit.Client.Bank.Balance += payingSize;
            credit.Client.Balance -= payingSize;

            if (credit.CreditMonthlyPayment.PercentPayment == 0 && credit.CreditBalance == 0)
            {
                credit.IsActive = false;
            }

            await SqlContext.SaveChangesAsync();

            return credit;
        }

        public async Task<CreditAccount> UpdateMonthlyPayment(UpdateMothlyPaymentRequestModel model)
        {
            var credit = await SqlContext.CreditAccounts.Include(c => c.AccountChart)
                .Include(c => c.Client)
                .Include(c => c.CreditMonthlyPayment)
                .FirstOrDefaultAsync(c => c.Id == model.CreditId && c.Client.Id == model.ClientId);

            if (credit == null || !credit.IsActive)
            {
                throw new AppException("Кредит не был найден или же он закрыт");
            }

            double totalCredit = credit.CreditBalance;
            double monthPercent = credit.AccountChart.AccountingPercent;

            double currentMothPay = credit.CreditMonthlyPayment.MonthlyPayment + (totalCredit * (monthPercent / 12)) / 100;

            credit.CreditBalance -= currentMothPay;
            credit.CreditMonthlyPayment.PercentPayment += currentMothPay;

            if (credit.CreditBalance <= 0) { credit.CreditBalance = 0; }

            await SqlContext.SaveChangesAsync();

            return credit;
        }

        public async Task<CreditAccount> GetCredit(GetCreditRequestModel model)
        {
            var credit = await SqlContext.CreditAccounts.Include(c => c.AccountChart)
                .Include(c => c.Client).ThenInclude(c => c.Bank)
                .Include(c => c.CreditMonthlyPayment)
                .FirstOrDefaultAsync(c => c.Id == model.CreditId && c.Client.Id == model.ClientId);

            if (credit.CreditMonthlyPayment.PercentPayment == 0 && credit.CreditBalance == 0)
            {
                credit.IsActive = false;
            }

            if (credit == null)
            {
                throw new AppException("Кредит не был найден или же он закрыт");
            }

            return credit;
        }
    }
}