using System;

namespace DepositKreditApp.Models.ResponseModels.InterestAccounts
{
    public class InterestAccountResponseModel
    {
        public Guid Id { get; set; }

        public double BalanceCharge { get; set; }
    }
}