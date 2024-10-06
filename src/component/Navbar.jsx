 
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear both the JWT and token from localStorage
    localStorage.removeItem('jwt');  // Remove JWT from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
    
    // Redirect to the Sign-In page and replace the current entry in the browser history
    navigate('/', { replace: true });
  };

  const isLoggedIn = () => {
    return localStorage.getItem('jwt') && localStorage.getItem('token');
  };

  return (
    <div className='w-full h-[10%] flex items-center bg-gray-200 fixed top-0 z-10'>
      <div className='text-gray-700 font-bold text-2xl p-4'>Jobs Engine</div>
      <div className='flex mx-auto mr-10 gap-5 justify-center'>
        <Link to="/dashboard" className='font-bold text-gray-800'>Home</Link>
        <Link to="/my-resume" className='font-bold text-gray-800'>My Resume</Link>
      </div>
      <div className='ml-auto mr-2'>
        {isLoggedIn() ? (
          <div 
            className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer'
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} />
          </div>
        ) : (
          <Link to="/registerform">
            <Button className='rounded-lg text-lg bg-black px-5 py-1 h-auto normal-case'>
              Register
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
