using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DepositKreditApp.Models.ResponseModels.AccountCharts;
using DepositKreditApp.Models.ResponseModels.CreditMonthlyPayment;

namespace DepositKreditApp.Models.ResponseModels.CreditAccounts
{
    public class CreditAccountReponseModel
    {
        public Guid Id { get; set; }

        public double CreditBalance { get; set; }

        public bool IsActive { get; set; }

        public DateTime ActiveBefore { get; set; }

        public double PaymentsLeft { get; set; }

        public AccountChartResponseModel AccountChart { get; set; }
    }
}