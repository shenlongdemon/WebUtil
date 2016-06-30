using SchoolRepository;
using SchoolRepository.EFRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
