using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DepositKreditApp.Database
{
    public class DepositAccount
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public double DepositBalance { get; set; }

        public bool IsActive { get; set; }

        public DateTime ActiveBefore { get; set; }

        public Guid InterestAccountId { get; set; }

        public InterestAccount InterestAccount { get; set; }

        public AccountChart AccountChart { get; set; }

        public Client Client { get; set; }
    }
}