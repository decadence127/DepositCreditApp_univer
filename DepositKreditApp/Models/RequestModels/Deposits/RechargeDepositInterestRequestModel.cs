using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DepositKreditApp.Models.RequestModels.Deposits
{
    public class RechargeDepositInterestRequestModel
    {
        public Guid ClientId { get; set; }

        public Guid DepositId { get; set; }
    }
}