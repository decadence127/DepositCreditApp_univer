using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DepositKreditApp.Database
{
    public class MsSqlContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }

        public DbSet<Bank> Banks { get; set; }

        public DbSet<AccountChart> AccountCharts { get; set; }

        public DbSet<DepositAccount> DepositAccounts { get; set; }
        
        public DbSet<CreditAccount> CreditAccounts { get; set; }

        public DbSet<CreditMonthlyPayment> CreditMonthlyPayments { get; set; }

        public MsSqlContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DepositAccount>()
                .HasOne(d => d.InterestAccount)
                .WithOne(i => i.DepositAccount)
                .HasForeignKey<InterestAccount>(i => i.DepositAccountId);

            modelBuilder.Entity<CreditAccount>()
                .HasOne(d => d.CreditMonthlyPayment)
                .WithOne(i => i.CreditAccount)
                .HasForeignKey<CreditMonthlyPayment>(i => i.CreditAccountId);

            base.OnModelCreating(modelBuilder);
        }
    }
}