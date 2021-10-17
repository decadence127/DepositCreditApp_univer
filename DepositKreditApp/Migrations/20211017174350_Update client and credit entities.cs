using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DepositKreditApp.Migrations
{
    public partial class Updateclientandcreditentities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CreditAccount_AccountCharts_AccountChartId",
                table: "CreditAccount");

            migrationBuilder.DropForeignKey(
                name: "FK_CreditAccount_Clients_ClientId",
                table: "CreditAccount");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CreditAccount",
                table: "CreditAccount");

            migrationBuilder.DropColumn(
                name: "DepositBalance",
                table: "CreditAccount");

            migrationBuilder.RenameTable(
                name: "CreditAccount",
                newName: "CreditAccounts");

            migrationBuilder.RenameIndex(
                name: "IX_CreditAccount_ClientId",
                table: "CreditAccounts",
                newName: "IX_CreditAccounts_ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_CreditAccount_AccountChartId",
                table: "CreditAccounts",
                newName: "IX_CreditAccounts_AccountChartId");

            migrationBuilder.AddColumn<int>(
                name: "PIN",
                table: "Clients",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActiveBefore",
                table: "CreditAccounts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "CreditBalance",
                table: "CreditAccounts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "CreditMonthlyPaymentId",
                table: "CreditAccounts",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CreditAccounts",
                table: "CreditAccounts",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CreditMonthlyPayments",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    MonthlyPayment = table.Column<double>(nullable: false),
                    PercentPayment = table.Column<double>(nullable: false),
                    CreditAccountId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditMonthlyPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreditMonthlyPayments_CreditAccounts_CreditAccountId",
                        column: x => x.CreditAccountId,
                        principalTable: "CreditAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CreditMonthlyPayments_CreditAccountId",
                table: "CreditMonthlyPayments",
                column: "CreditAccountId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CreditAccounts_AccountCharts_AccountChartId",
                table: "CreditAccounts",
                column: "AccountChartId",
                principalTable: "AccountCharts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CreditAccounts_Clients_ClientId",
                table: "CreditAccounts",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CreditAccounts_AccountCharts_AccountChartId",
                table: "CreditAccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_CreditAccounts_Clients_ClientId",
                table: "CreditAccounts");

            migrationBuilder.DropTable(
                name: "CreditMonthlyPayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CreditAccounts",
                table: "CreditAccounts");

            migrationBuilder.DropColumn(
                name: "PIN",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "ActiveBefore",
                table: "CreditAccounts");

            migrationBuilder.DropColumn(
                name: "CreditBalance",
                table: "CreditAccounts");

            migrationBuilder.DropColumn(
                name: "CreditMonthlyPaymentId",
                table: "CreditAccounts");

            migrationBuilder.RenameTable(
                name: "CreditAccounts",
                newName: "CreditAccount");

            migrationBuilder.RenameIndex(
                name: "IX_CreditAccounts_ClientId",
                table: "CreditAccount",
                newName: "IX_CreditAccount_ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_CreditAccounts_AccountChartId",
                table: "CreditAccount",
                newName: "IX_CreditAccount_AccountChartId");

            migrationBuilder.AddColumn<double>(
                name: "DepositBalance",
                table: "CreditAccount",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CreditAccount",
                table: "CreditAccount",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CreditAccount_AccountCharts_AccountChartId",
                table: "CreditAccount",
                column: "AccountChartId",
                principalTable: "AccountCharts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CreditAccount_Clients_ClientId",
                table: "CreditAccount",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
