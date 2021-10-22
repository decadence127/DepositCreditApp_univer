using System;
using System.ComponentModel.DataAnnotations;

namespace DepositKreditApp.Models.RequestModels.Clients
{
    public class CreateClientRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Passport { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Residence { get; set; }

        [Required]
        public double MonthlyIncome { get; set; }

        [Required]
        public double Balance { get; set; }

        [Required]
        public Guid BankId { get; set; }
    }
}