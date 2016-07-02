using Repository;
using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
namespace EFRepository
{
    public abstract class DbContextRepository<T> : IGenericRepository<T> where T : class 
    {
        private DbContext _dbContext;
        public DbContext DbContext { get { return _dbContext; } set { _dbContext = value; } }
        public virtual T Insert(T entity)
        {
            return _dbContext.Set<T>().Add(entity);
        }

        public virtual IQueryable<T> All()
        {
            IQueryable<T> query = _dbContext.Set<T>().AsQueryable<T>();
            return query;
        }

        public virtual void Delete(T entity)
        {
            _dbContext.Set<T>().Attach(entity);
            _dbContext.Set<T>().Remove(entity);
        }


        
        public virtual void Update(T entity)
        {
            _dbContext.Entry<T>(entity).State = EntityState.Modified;
        }
        

        public virtual IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = All().Where(predicate).AsQueryable<T>();
            return query;
        }
    }
}
