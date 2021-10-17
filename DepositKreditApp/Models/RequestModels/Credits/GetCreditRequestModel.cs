using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DepositKreditApp.Models.RequestModels.Credits
{
    public class GetCreditRequestModel
    {
        public Guid ClientId { get; set; }

        public Guid CreditId { get; set; }
    }
}
