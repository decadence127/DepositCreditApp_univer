using System;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Credits
{
    public class RepayCreditRequestModel
    {
        [FromRoute]
        public Guid CreditId { get; set; }

        [FromRoute]
        public Guid ClientId { get; set; }

        public double Payment { get; set; }
    }
}