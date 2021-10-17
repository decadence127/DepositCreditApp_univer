using System;

namespace DepositKreditApp.Helper
{
    public static class Randomizer
    {
        public static Random Random { get; set; }

        static Randomizer()
        {
            Random = new Random();
        }

        public static int GeneratePIN()
        {
            return Random.Next(1000, 9999);
        }
    }
}