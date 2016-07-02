using SchoolRepository;
using SchoolRepository.EFRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;
using Commons;
using Domain;

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
                                        //.Select(p => new DistrictDTO
                                        //{
                                        //    Id = p.id,
                                        //    Name = p.name,
                                        //    Areas = p.Areas.ToList<object>()
                                        //})
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

            List<object> children = child
                                    .Select(p =>
                                        new ChildrenDTO {
                                            id = p.id,
                                            fullName = p.fullName,
                                            address = p.address,
                                            Area = new AreaDTO { id = p.Area.id, name = p.Area.name},
                                            birthDate = p.birthDate ?? DateTime.Now,
                                            Class = new ClassDTO { id = p.Class.id, name = p.Class.name },
                                            dateIn = p.dateIn ?? DateTime.Now,
                                            dateOut = p.dateOut,
                                            sex = p.sex ?? true,
                                            isActive = p.isActive ?? true,
                                            fatherName = p.fatherName,
                                            fatherPhone = p.fatherPhone,
                                            motherName = p.motherName,
                                            motherPhone = p.motherPhone
                                            
                                        }).ToList<object>();
            ResponseList response = new ResponseList();
            response.Data = children;
            response.TotalItemCount = children.Count;
            response.NumberOfPages = 2;
            return response;
        }
        public object DeleteChildren(string id) {
            Child child = UOW.ChildrenRepository.Where(p => p.id.ToString().Equals(id)).First();
            child.isActive = false;
            UOW.ChildrenRepository.Update(child);
            UOW.Commit();
            return true;
        }

        public object UpdateChildren(ChildrenDTO childDto)
        {
            Child child = UOW.ChildrenRepository.Where(p => p.id.Equals(childDto.id)).First();
            child.fullName = childDto.fullName;
            child.dateOut = childDto.dateOut;
            child.dateIn = childDto.dateIn;
            child.address = childDto.address;
            child.areaId = childDto.Area.id;
            child.birthDate = childDto.birthDate;
            child.classId = childDto.Class.id;
            child.fatherName = childDto.fatherName;
            child.fatherPhone = childDto.fatherPhone;
            child.motherName = childDto.motherName;
            child.motherPhone = childDto.motherPhone;
            child.sex = childDto.sex;

            UOW.ChildrenRepository.Update(child);
            UOW.Commit();

            return childDto;
        }
        public object CreateChildren(ChildrenDTO childDto)
        {
            Child child = new Child();
            child.id = Guid.NewGuid();
            child.fullName = childDto.fullName;
            child.dateOut = childDto.dateOut;
            child.dateIn = childDto.dateIn;
            child.address = childDto.address;
            child.areaId = childDto.Area.id;
            child.birthDate = childDto.birthDate;
            child.classId = childDto.Class.id;
            child.fatherName = childDto.fatherName;
            child.fatherPhone = childDto.fatherPhone;
            child.motherName = childDto.motherName;
            child.motherPhone = childDto.motherPhone;
            child.sex = childDto.sex;

            child = UOW.ChildrenRepository.Insert(child);
            UOW.Commit();
            childDto.id = child.id;
            return childDto;
        }
    }
}
