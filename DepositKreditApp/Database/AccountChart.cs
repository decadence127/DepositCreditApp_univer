using System;
using System.ComponentModel.DataAnnotations.Schema;
using DepositKreditApp.Enums;

namespace DepositKreditApp.Database
{
    public class AccountChart
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public AccountType AccountType { get; set; }

        public string ChartName { get; set; }

        public double AccountingPercent { get; set; }

        public bool UsePercentInRecharging { get; set; }
    }
}