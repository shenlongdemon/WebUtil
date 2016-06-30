using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolRepository.EFRepository
{
    public class EFSchoolUnitOfWork : ISchoolUnitOfWork
    {
        private SchoolDbContext _dbContext = new SchoolDbContext();


        public EFSchoolUnitOfWork()
        {
            _districtRepository = new EFDistrictRepository(_dbContext);
            _classRepository = new EFClassRepository(_dbContext);
            _childrenRepository = new EFChildrenRepository(_dbContext);
        }



        private readonly IChildrenRepository _childrenRepository;
        public IChildrenRepository ChildrenRepository
        {
            get
            {
                return _childrenRepository;
            }
        }

        private readonly IDistrictRepository _districtRepository;
        public IDistrictRepository DistrictRepository
        {
            get
            {
                return _districtRepository;
            }
        }

        private readonly IClassRepository _classRepository;
        public IClassRepository ClassRepository
        {
            get
            {
                return _classRepository;
            }
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }

        private bool disposed = false;


        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
