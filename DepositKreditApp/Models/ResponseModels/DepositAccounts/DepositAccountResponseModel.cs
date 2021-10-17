using System;
using DepositKreditApp.Models.ResponseModels.AccountCharts;
using DepositKreditApp.Models.ResponseModels.InterestAccounts;

namespace DepositKreditApp.Models.ResponseModels.DepositAccounts
{
    public class DepositAccountResponseModel
    {
        public Guid Id { get; set; }

        public double DepositBalance { get; set; }

        public bool IsActive { get; set; }

        public DateTime ActiveBefore { get; set; }

        public InterestAccountResponseModel InterestAccount { get; set; }

        public AccountChartResponseModel AccountChart { get; set; }
    }
}