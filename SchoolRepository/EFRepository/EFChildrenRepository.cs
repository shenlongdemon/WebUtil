using EFRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolRepository.EFRepository
{
    public class EFChildrenRepository : DbContextRepository<Child>, IChildrenRepository
    {
        public EFChildrenRepository(DbContext DbContext)
        {
            this.DbContext = DbContext;
        }
       
    }
}
