import { useState } from 'react';

const NavDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <li className="cursor-pointer">Login / Signup <i className="fa-solid fa-chevron-down" style={{marginLeft:'6px'}}></i></li>
      
      {isHovered && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-gray-100" style={{display:"flex",justifyContent:'center',alignItems:'center',gap:'10px'}}>
              <div className="text-base font-medium text-gray-900 mb-1">Doctor</div>
              <div className="flex gap-4">
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm" style={{marginRight:"10px"}}>Login</a>
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">Sign up</a>
              </div>
            </div>
            <div className="px-4 py-3" style={{display:"flex",justifyContent:'center',alignItems:'center',gap:'10px'}}>
              <div className="text-base font-medium text-gray-900 mb-1">Patients</div>
              <div className="flex gap-4">
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm" style={{marginRight:"10px"}}>Login</a>
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm" >Sign up</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;