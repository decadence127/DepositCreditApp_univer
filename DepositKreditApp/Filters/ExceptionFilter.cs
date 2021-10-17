using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DepositKreditApp.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var exceptionType = context.Exception.GetType();

            switch (exceptionType.Name)
            {
                case nameof(AppException): { HandleException(context, 404); break; }
            }
        }

        private void HandleException(ExceptionContext context, int statusCode)
        {
            context.ExceptionHandled = true;
            context.Result = new JsonResult(new { message = context.Exception.Message })
            {
                StatusCode = statusCode
            };
        }
    }
}
