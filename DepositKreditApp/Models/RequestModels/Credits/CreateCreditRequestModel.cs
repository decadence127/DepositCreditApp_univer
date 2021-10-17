using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Credits
{
    public class CreateCreditRequestModel
    {
        [FromRoute]
        public Guid ClientId { get; set; }

        [Required]
        public Guid AccountChartId { get; set; }

        [Required]
        public double CreditBalance { get; set; }

        [Required]
        public DateTime ActiveBefore { get; set; }
    }
}