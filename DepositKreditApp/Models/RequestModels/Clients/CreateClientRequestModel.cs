using System;
using System.ComponentModel.DataAnnotations;

namespace DepositKreditApp.Models.RequestModels.Clients
{
    public class CreateClientRequestModel
    {
        public string Name { get; set; }

        public string Passport { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Residence { get; set; }

        public double MonthlyIncome { get; set; }

        public double Balance { get; set; }

        [Required]
        public Guid BankId { get; set; }
    }
}