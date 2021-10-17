using System;

namespace DepositKreditApp.Models.RequestModels.Credits
{ 
    public class UpdateMothlyPaymentRequestModel
    {
        public Guid CreditId { get; set; }

        public Guid ClientId { get; set; }
    }
}