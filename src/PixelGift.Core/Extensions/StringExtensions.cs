using System.Security.Cryptography;
using System.Text;

namespace PixelGift.Core.Extensions;

public static class StringExtensions
{
    public static string ToSha256Hash(this string input)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));

            var builder = new StringBuilder();
            foreach (byte b in hashedBytes)
            {
                builder.Append(b.ToString("x2"));
            }

            return builder.ToString();
        }
    }
}
