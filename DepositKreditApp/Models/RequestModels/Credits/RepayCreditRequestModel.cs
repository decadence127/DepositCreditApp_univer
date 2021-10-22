using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Credits
{
    public class RepayCreditRequestModel
    {
        [FromRoute]
        public Guid CreditId { get; set; }

        [FromRoute]
        public Guid ClientId { get; set; }

        [Required]
        public double Payment { get; set; }
    }
}