using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class DistrictDTO 
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<object> Areas { get; set; }
    }
}
