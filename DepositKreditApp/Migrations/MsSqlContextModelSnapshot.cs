﻿// <auto-generated />
using System;
using DepositKreditApp.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DepositKreditApp.Migrations
{
    [DbContext(typeof(MsSqlContext))]
    partial class MsSqlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DepositKreditApp.Database.AccountChart", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccountType")
                        .HasColumnType("int");

                    b.Property<double>("AccountingPercent")
                        .HasColumnType("float");

                    b.Property<Guid?>("BankId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ChartName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("UsePercentInRecharging")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("BankId");

                    b.ToTable("AccountCharts");
                });

            modelBuilder.Entity("DepositKreditApp.Database.Bank", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Balance")
                        .HasColumnType("float");

                    b.Property<string>("BankTitle")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Banks");
                });

            modelBuilder.Entity("DepositKreditApp.Database.Client", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Balance")
                        .HasColumnType("float");

                    b.Property<Guid?>("BankId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("MonthlyIncome")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PIN")
                        .HasColumnType("int");

                    b.Property<string>("Passport")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Residence")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BankId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("DepositKreditApp.Database.CreditAccount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("AccountChartId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ActiveBefore")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ClientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("CreditBalance")
                        .HasColumnType("float");

                    b.Property<Guid>("CreditMonthlyPaymentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("AccountChartId");

                    b.HasIndex("ClientId");

                    b.ToTable("CreditAccounts");
                });

            modelBuilder.Entity("DepositKreditApp.Database.CreditMonthlyPayment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CreditAccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("MonthlyPayment")
                        .HasColumnType("float");

                    b.Property<double>("PercentPayment")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("CreditAccountId")
                        .IsUnique();

                    b.ToTable("CreditMonthlyPayments");
                });

            modelBuilder.Entity("DepositKreditApp.Database.DepositAccount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("AccountChartId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ActiveBefore")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ClientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("DepositBalance")
                        .HasColumnType("float");

                    b.Property<Guid>("InterestAccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("AccountChartId");

                    b.HasIndex("ClientId");

                    b.ToTable("DepositAccounts");
                });

            modelBuilder.Entity("DepositKreditApp.Database.InterestAccount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("BalanceCharge")
                        .HasColumnType("float");

                    b.Property<Guid>("DepositAccountId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DepositAccountId")
                        .IsUnique();

                    b.ToTable("InterestAccount");
                });

            modelBuilder.Entity("DepositKreditApp.Database.AccountChart", b =>
                {
                    b.HasOne("DepositKreditApp.Database.Bank", null)
                        .WithMany("AccountCharts")
                        .HasForeignKey("BankId");
                });

            modelBuilder.Entity("DepositKreditApp.Database.Client", b =>
                {
                    b.HasOne("DepositKreditApp.Database.Bank", "Bank")
                        .WithMany("Clients")
                        .HasForeignKey("BankId");
                });

            modelBuilder.Entity("DepositKreditApp.Database.CreditAccount", b =>
                {
                    b.HasOne("DepositKreditApp.Database.AccountChart", "AccountChart")
                        .WithMany()
                        .HasForeignKey("AccountChartId");

                    b.HasOne("DepositKreditApp.Database.Client", "Client")
                        .WithMany("CreditAccounts")
                        .HasForeignKey("ClientId");
                });

            modelBuilder.Entity("DepositKreditApp.Database.CreditMonthlyPayment", b =>
                {
                    b.HasOne("DepositKreditApp.Database.CreditAccount", "CreditAccount")
                        .WithOne("CreditMonthlyPayment")
                        .HasForeignKey("DepositKreditApp.Database.CreditMonthlyPayment", "CreditAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DepositKreditApp.Database.DepositAccount", b =>
                {
                    b.HasOne("DepositKreditApp.Database.AccountChart", "AccountChart")
                        .WithMany()
                        .HasForeignKey("AccountChartId");

                    b.HasOne("DepositKreditApp.Database.Client", "Client")
                        .WithMany("DepositAccounts")
                        .HasForeignKey("ClientId");
                });

            modelBuilder.Entity("DepositKreditApp.Database.InterestAccount", b =>
                {
                    b.HasOne("DepositKreditApp.Database.DepositAccount", "DepositAccount")
                        .WithOne("InterestAccount")
                        .HasForeignKey("DepositKreditApp.Database.InterestAccount", "DepositAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
