using System;

namespace DepositKreditApp.Models.RequestModels.Deposits
{
    public class GetDepositAccountRequestModel
    {
        public Guid ClientId { get; set; }

        public Guid DepositId { get; set; }
    }
}