using Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EFRepository
{
    public class EFRepository<TEntity> : IRepository<TEntity>, IDisposable where TEntity : class
    {
        private readonly DbContext _dbContext;

        public EFRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public TEntity First(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where<TEntity>(predicate).FirstOrDefault();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
        public int SaveChanges()
        {
            return _dbContext.SaveChanges();
        }
        public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().Where<TEntity>(predicate);
        }
        public TEntity Insert(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            SaveChanges();
            return entity;
        }
        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
            int insert = await SaveChangesAsync();
            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            _dbContext.Entry<TEntity>(entity).State = EntityState.Modified;
            //SaveChanges();
            return entity;
        }

        public int Delete(TEntity entity)
        {            
            _dbContext.Set<TEntity>().Remove(entity);
            return 1;
        }
        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsQueryable<TEntity>();
        }

        public int DeleteAll(IQueryable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().RemoveRange(entities);
            return 1;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~EFRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }

        
        #endregion

    }
}
