using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> All();
        IQueryable<T> Where(Expression<Func<T, bool>> predicate);
        T Insert(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}
