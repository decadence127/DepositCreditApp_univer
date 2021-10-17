using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DepositKreditApp.Database
{
    public class CreditMonthlyPayment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public double MonthlyPayment { get; set; }

        public double PercentPayment { get; set; }

        public Guid CreditAccountId { get; set; }

        public CreditAccount CreditAccount { get; set; }
    }
}