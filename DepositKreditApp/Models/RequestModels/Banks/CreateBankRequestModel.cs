namespace DepositKreditApp.Models.RequestModels.Banks
{
    public class CreateBankRequestModel
    {
        public string BankTitle { get; set; }

        public double Balance { get; set; }
    }
}