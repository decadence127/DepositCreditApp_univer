using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DepositKreditApp.Database
{
    public class Bank
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string BankTitle { get; set; }

        public double Balance { get; set; }

        public ICollection<Client> Clients { get; set; } = new List<Client>();

        public ICollection<AccountChart> AccountCharts { get; set; } = new List<AccountChart>();
    }
}
