using System;
using System.Collections.Generic;
using DepositKreditApp.Models.ResponseModels.AccountCharts;

namespace DepositKreditApp.Models.ResponseModels.Banks
{
    public class BankResponseModel
    {
        public Guid Id { get; set; }

        public string BankTitle { get; set; }

        public double Balance { get; set; }

        public List<AccountChartResponseModel> AccountCharts { get; set; }
    }
}