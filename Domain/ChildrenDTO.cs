using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ChildrenDTO
    {
        public System.Guid id { get; set; }
        public string fullName { get; set; }
        public DateTime dateIn { get; set; }
        public Nullable<System.DateTime> dateOut { get; set; }
        public bool sex { get; set; }
        public DateTime birthDate { get; set; }
        public string address { get; set; }
        public string fatherName { get; set; }
        public string fatherPhone { get; set; }
        public string motherName { get; set; }
        public string motherPhone { get; set; }
        public bool isActive { get; set; }

        public AreaDTO Area { get; set; }
        public ClassDTO Class { get; set; }
    }
}
