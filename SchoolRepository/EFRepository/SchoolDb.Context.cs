﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SchoolRepository.EFRepository
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SchoolDbContext : DbContext
    {
        public SchoolDbContext()
            : base("name=SchoolDbContext")
        {
            
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<Child> Children { get; set; }
        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<District> Districts { get; set; }
    }
}
