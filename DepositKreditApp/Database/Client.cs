using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DepositKreditApp.Database
{
    public class Client
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Passport { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Residence { get; set; }

        public double MonthlyIncome { get; set; }

        public double Balance { get; set; }

        public int PIN { get; set; }

        public ICollection<DepositAccount> DepositAccounts { get; set; } = new List<DepositAccount>();

        public ICollection<CreditAccount> CreditAccounts { get; set; } = new List<CreditAccount>();

        public Bank Bank { get; set; }
    }
}