using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IRepository<TEntity>: IDisposable where TEntity : class
    {

        TEntity First(Expression<Func<TEntity, bool>> predicate);
        TEntity Insert(TEntity entity);
        Task<TEntity> InsertAsync(TEntity entity);
        TEntity Update(TEntity entity);
        int DeleteAll(IQueryable<TEntity> entities);
        int Delete(TEntity entity);
        IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> GetAll();
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
