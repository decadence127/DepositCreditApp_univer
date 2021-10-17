using System;

namespace DepositKreditApp.Filters
{
    public class AppException : Exception
    {
        public AppException(string message) : base(message) { }
    }
}
