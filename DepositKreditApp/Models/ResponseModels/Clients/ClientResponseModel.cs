using System;
using System.Collections.Generic;
using DepositKreditApp.Models.ResponseModels.CreditAccounts;
using DepositKreditApp.Models.ResponseModels.DepositAccounts;
using Microsoft.EntityFrameworkCore;

namespace DepositKreditApp.Models.ResponseModels.Clients
{
    public class ClientResponseModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Passport { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Residence { get; set; }

        public double MonthlyIncome { get; set; }

        public double Balance { get; set; }

        public List<DepositAccountResponseModel> DepositAccounts { get; set; }

        public List<CreditAccountReponseModel> CreditAccounts { get; set; }

        public ClientResponseModel()
        {
            DepositAccounts = new List<DepositAccountResponseModel>();
            CreditAccounts = new List<CreditAccountReponseModel>();
        }
    }
}