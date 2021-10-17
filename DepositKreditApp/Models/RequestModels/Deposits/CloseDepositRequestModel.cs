using System;

namespace DepositKreditApp.Models.RequestModels.Deposits
{
    public class CloseDepositRequestModel
    {
        public Guid ClientId { get; set; }

        public Guid DepositId { get; set; }
    }
}