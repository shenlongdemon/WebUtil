using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolRepository
{
    public interface ISchoolUnitOfWork : IUnitOfWork
    {
        IDistrictRepository DistrictRepository { get; }
        IClassRepository ClassRepository { get; }
    }

}
