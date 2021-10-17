using System;
using DepositKreditApp.Enums;

namespace DepositKreditApp.Models.ResponseModels.AccountCharts
{
    public class AccountChartResponseModel
    {
        public Guid Id { get; set; }

        public AccountType AccountType { get; set; }

        public string ChartName { get; set; }

        public double AccountingPercent { get; set; }

        public bool UsePercentInRecharging { get; set; }
    }
}