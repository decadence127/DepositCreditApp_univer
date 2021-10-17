using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DepositKreditApp.Database
{
    public class CreditAccount
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public double CreditBalance { get; set; }

        public bool IsActive { get; set; }

        public DateTime ActiveBefore { get; set; }

        public Guid CreditMonthlyPaymentId { get; set; }

        public AccountChart AccountChart { get; set; }

        public Client Client { get; set; }

        public CreditMonthlyPayment CreditMonthlyPayment { get; set; }
    }
}