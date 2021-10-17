using System;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Clients
{
    public class AppendClientBalanceRequestModel
    {
        [FromRoute]
        public Guid Id { get; set; }

        public int Pin { get; set; }

        public int TotalSum { get; set; }
    }
}