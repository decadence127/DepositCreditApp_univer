using System;
using Microsoft.AspNetCore.Mvc;

namespace DepositKreditApp.Models.RequestModels.Clients
{
    public class GetClientHistoryRequestModel
    {
        [FromRoute]
        public Guid Id { get; set; }

        public bool ShowClosedAccounts { get; set; }
    }
}