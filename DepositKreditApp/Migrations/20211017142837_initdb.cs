using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DepositKreditApp.Migrations
{
    public partial class initdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Banks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    BankTitle = table.Column<string>(nullable: true),
                    Balance = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountCharts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AccountType = table.Column<int>(nullable: false),
                    ChartName = table.Column<string>(nullable: true),
                    AccountingPercent = table.Column<double>(nullable: false),
                    UsePercentInRecharging = table.Column<bool>(nullable: false),
                    BankId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountCharts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountCharts_Banks_BankId",
                        column: x => x.BankId,
                        principalTable: "Banks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Passport = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Phone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Residence = table.Column<string>(nullable: true),
                    MonthlyIncome = table.Column<double>(nullable: false),
                    Balance = table.Column<double>(nullable: false),
                    BankId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clients_Banks_BankId",
                        column: x => x.BankId,
                        principalTable: "Banks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CreditAccount",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DepositBalance = table.Column<double>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    AccountChartId = table.Column<Guid>(nullable: true),
                    ClientId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreditAccount_AccountCharts_AccountChartId",
                        column: x => x.AccountChartId,
                        principalTable: "AccountCharts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CreditAccount_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DepositAccounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DepositBalance = table.Column<double>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    ActiveBefore = table.Column<DateTime>(nullable: false),
                    InterestAccountId = table.Column<Guid>(nullable: false),
                    AccountChartId = table.Column<Guid>(nullable: true),
                    ClientId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepositAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DepositAccounts_AccountCharts_AccountChartId",
                        column: x => x.AccountChartId,
                        principalTable: "AccountCharts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DepositAccounts_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InterestAccount",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    BalanceCharge = table.Column<double>(nullable: false),
                    DepositAccountId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterestAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterestAccount_DepositAccounts_DepositAccountId",
                        column: x => x.DepositAccountId,
                        principalTable: "DepositAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountCharts_BankId",
                table: "AccountCharts",
                column: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_BankId",
                table: "Clients",
                column: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditAccount_AccountChartId",
                table: "CreditAccount",
                column: "AccountChartId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditAccount_ClientId",
                table: "CreditAccount",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositAccounts_AccountChartId",
                table: "DepositAccounts",
                column: "AccountChartId");

            migrationBuilder.CreateIndex(
                name: "IX_DepositAccounts_ClientId",
                table: "DepositAccounts",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_InterestAccount_DepositAccountId",
                table: "InterestAccount",
                column: "DepositAccountId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CreditAccount");

            migrationBuilder.DropTable(
                name: "InterestAccount");

            migrationBuilder.DropTable(
                name: "DepositAccounts");

            migrationBuilder.DropTable(
                name: "AccountCharts");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Banks");
        }
    }
}
