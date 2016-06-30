using EFRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolRepository.EFRepository
{
    public class EFClassRepository : DbContextRepository<Class>, IClassRepository
    {
        public EFClassRepository(DbContext DbContext)
        {
            this.DbContext = DbContext;
        }
       
    }
}
