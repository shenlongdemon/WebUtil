using EFRepository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolRepository.EFRepository
{
    public class EFDistrictRepository : DbContextRepository<District>, IDistrictRepository
    {
        public EFDistrictRepository(DbContext DbContext)
        {
            this.DbContext = DbContext;
        }
       
    }
}
