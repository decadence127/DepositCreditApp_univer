using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DepositKreditApp.Database
{
    public class InterestAccount
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public double BalanceCharge { get; set; }

        public Guid DepositAccountId { get; set; }

        public DepositAccount DepositAccount { get; set; }
    }
}
