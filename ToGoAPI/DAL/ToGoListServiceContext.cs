using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using ToGoAPI.Controllers;
using ToGoAPI.Models;

namespace ToGoAPI.DAL
{
    public class ToGoListServiceContext : DbContext
    {
        public ToGoListServiceContext()
            : base("ToGoListServiceContext")
        { }
        public DbSet<ToGo> ToGoes { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}