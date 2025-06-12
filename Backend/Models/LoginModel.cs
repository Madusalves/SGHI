using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class LoginModel : IdentityUser
    {
        public string Name { get; set; }

    }
}