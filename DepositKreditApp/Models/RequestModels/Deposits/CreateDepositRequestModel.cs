using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Deposits
{
    public class CreateDepositRequestModel
    {
        [FromRoute]
        public Guid ClientId { get; set; }

        [Required]
        public Guid AccountChartId { get; set; }

        [Required]
        public double DepositBalance { get; set; }

        [Required]
        public DateTime ActiveBefore { get; set; }
    }
}