using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Commons
{
    public class ResponseList
    {
        public object Data { get; set; }
        public int NumberOfPages { get; set; }
        public int TotalItemCount { get; set; }
    }
}