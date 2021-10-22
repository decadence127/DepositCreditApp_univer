using System.ComponentModel.DataAnnotations;

namespace DepositKreditApp.Models.RequestModels.Banks
{
    public class CreateBankRequestModel
    {
        [Required]
        public string BankTitle { get; set; }

        [Required]
        public double Balance { get; set; }
    }
}