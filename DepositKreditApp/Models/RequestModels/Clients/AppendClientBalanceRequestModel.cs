using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Clients
{
    public class AppendClientBalanceRequestModel
    {
        [FromRoute]
        public Guid Id { get; set; }

        [Required]
        public int Pin { get; set; }

        [Required]
        public int TotalSum { get; set; }
    }
}