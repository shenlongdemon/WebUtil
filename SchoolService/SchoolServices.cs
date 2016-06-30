using SchoolRepository;
using SchoolRepository.EFRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;
using Commons;

namespace SchoolService
{
    public class SchoolServices
    {
        private ISchoolUnitOfWork UOW;
        public SchoolServices() {
            UOW = new EFSchoolUnitOfWork();
        }
        public List<object> GetDistricts() {
            List<object> districts = UOW.DistrictRepository.Where(p => p.isActive == true && p.Areas.Count > 0)
                                        .ToList<object>();
            return districts;
        }
        public List<object> GetClasses() {
            List<object> classes = UOW.ClassRepository.Where(p => p.isActive == true)
                                        .ToList<object>();
            return classes;
        }
        public ResponseList GetChildren(int page, int perPage, string sortBy, bool isASC)
        {
            IQueryable<Child> child = UOW.ChildrenRepository.Where(p => p.isActive == true);
            
            child = child.OrderByExt(sortBy, isASC);
            List<object> children = child.ToList<object>();
            ResponseList response = new ResponseList();
            response.Data = children;
            response.TotalItemCount = children.Count;
            response.NumberOfPages = 2;
            return response;
        }
    }
}
