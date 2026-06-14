import React from "react";
import { Link } from "react-router-dom";

const menu = [
  {
    label: "Dashboard",
    url: "/",
  },
  {
    label: "Students",
    url: "/students",
  },
  {
    label: "Teachers",
    url: "/teachers",
  },
];

 function MainBody() {
  return (
    
    <div className="bg-white h-full flex flex-col gap-4 px-3 py-5" >
      {menu.map((d) => {
        return (
            <div className="border-2 border-blue-50  hover:bg-blue-300 rounded-2xl p-2">
          <Link key={d.url} to={d.url} className=" text-blue-900 hover:text-blue-900" >
          
            {d.label}
          </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MainBody;