import React from 'react';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import loginbg from '../assets/images/LoginPageBg.jpg';

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Handle email submission for password reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    // You can add your password reset logic here

    // For now, we'll just log the action and navigate back
    console.log("Password reset email sent!");
    navigate('/'); // Navigate back to sign-in or another page after submission
  };

  return (
    <div className='flex w-full h-screen'>
      {/* Left Side: Form */}
      <div className='flex flex-col justify-center items-center w-1/2 h-full bg-white'>
        <h2 className='text-2xl font-semibold mb-4'>Forgot Password</h2>
        <form onSubmit={handlePasswordReset} className='w-[80%]'>
          <div className='mb-4'>
          <label className="block">Email Address</label>
            <input 
              type="email" 
              className='p-2 border rounded-md w-full p-4' 
              placeholder="Email Address" 
              required 
            />
          </div>
          <Button 
            type="submit" 
            className=' bg-black text-white w-full p-3 rounded-md text-lg mx-auto'
          >
            Send Email
          </Button>
        </form>
      </div>

      {/* Right Side: Image with Overlay */}
      <div className='relative w-1/2 h-full'>
        <img 
          src={loginbg} 
          alt="Login Background" 
          className='object-cover w-full h-full'
        />
        <div className='absolute inset-0 bg-black opacity-80 flex justify-center items-center'>
          <div className='p-6 mx-8 max-w-3xl'>
            <h2 className='text-white text-center text-4xl tracking-widest leading-normal font-bold m-0'>
              Join the largest job community in the world
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

