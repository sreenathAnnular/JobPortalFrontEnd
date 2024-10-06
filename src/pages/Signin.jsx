// import React, { useState } from 'react';
// import Navbar from '../component/Navbar';
// import { Button } from '@material-tailwind/react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../redux/signinSlice'; // Adjust the path as needed
// import loginbg from '../assets/images/LoginPageBg.jpg';

// const Signin = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Handle email/password sign-in
//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const action = await dispatch(signIn({ email, password }));
//       if (signIn.fulfilled.match(action)) {
//         // Navigate to dashboard after successful sign-in
//         navigate('/dashboard');
//       } else {
//         console.error('Sign in failed:', action.error.message);
//       }
//     } catch (error) {
//       console.error('Sign in error:', error);
//     }
//   };

//   // Handle Google sign-in
//   const handleGoogleSignIn = (credentialResponse) => {
//     console.log(credentialResponse);
//     // Here you can verify the token with your backend if needed.

//     // Navigate to home after successful Google sign-in
//     navigate('/home');
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google Sign-In Failed:', error);
//   };

//   // Navigate to the forgot password page
//   const handleForgotPassword = () => {
//     navigate('/forgot-password');
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='flex w-full h-screen'>
//         <div className='w-1/2 flex flex-col justify-center items-start p-10 ml-10'>
//           <div className='flex justify-between w-[80%] mt-8'>
//             <div></div>
//             <p>
//               Not a member? 
//               <a href="#" className="text-blue-700 underline hover:underline" style={{ color: '#0d6efd' }}> sign up now</a>
//             </p>
//           </div>
//           <h3 className='text-3xl mb-4'>Sign in</h3>
//           <form className='w-[80%]' onSubmit={handleSignIn}>
//             <div className='mb-4'>
//               <label className='block mb-1 text-xl text-gray-600'>Email Address</label>
//               <input 
//                 type="email" 
//                 className='p-4 text-xl w-full rounded-md' 
//                 style={{ backgroundColor: '#E8F0FE' }} 
//                 required 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block mb-1 text-xl text-gray-600'>Password</label>
//               <input 
//                 type="password" 
//                 className='p-4 w-full rounded-md' 
//                 style={{ backgroundColor: '#E8F0FE' }} 
//                 required 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <button 
//                 type="button" 
//                 onClick={handleForgotPassword} 
//                 className="text-blue-700 underline hover:underline" 
//                 style={{ color: '#0d6efd' }}
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <div className='mt-4'>
//               <Button type="submit" className='bg-black text-white normal-case w-full text-sm p-4'>
//                 Sign in
//               </Button>
//             </div>
//           </form>

//           {/* Google Sign In Button */}
//           <div className='mt-4'>
//             <GoogleLogin
//               onSuccess={handleGoogleSignIn}
//               onError={handleGoogleError}
//               render={renderProps => (
//                 <Button 
//                   onClick={renderProps.onClick}
//                   disabled={renderProps.disabled}
//                   className='bg-red-500 text-white normal-case w-full text-sm p-4'
//                 >
//                   Sign in with Google
//                 </Button>
//               )}
//             />
//           </div>

//           <div className='mt-4'>
//             <a href="#" className="text-blue-700 underline hover:underline" style={{ color: '#0d6efd' }}>
//               Sign in with LinkedIn
//             </a>
//           </div>
//         </div>
       
//         <div className='relative w-1/2 h-full'>
//           <img src={loginbg} alt="Login Background" className='object-cover w-full h-full' />
//           <div className='absolute inset-0 bg-black opacity-80 flex justify-center items-center'>
//             <div className='p-6 mx-8 max-w-3xl'>
//               <h2 className='text-white text-center text-4xl tracking-widest leading-normal font-bold m-0'>
//                 Join the largest job community in the world
//               </h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin; 



 
// import React, { useState } from 'react';
// import Navbar from '../component/Navbar';
// import { Button } from '@material-tailwind/react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import { useDispatch } from 'react-redux';
// import { signIn } from '../redux/signinSlice'; // Adjust the path as needed
// import loginbg from '../assets/images/LoginPageBg.jpg';

// const Signin = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const action = await dispatch(signIn({ email, password }));
//       if (signIn.fulfilled.match(action)) {
//         // Save the token and navigate to dashboard
//         localStorage.setItem('token', action.payload.token); // Save the token
//         localStorage.setItem('jwt', action.payload.jwt); // Save the JWT
//         navigate('/dashboard', { replace: true }); // Redirect to dashboard after successful login
//       } else {
//         console.error('Sign in failed:', action.error.message);
//       }
//     } catch (error) {
//       console.error('Sign in error:', error);
//     }
//   };

//   const handleGoogleSignIn = (credentialResponse) => {
//     console.log(credentialResponse);
//     localStorage.setItem('token', credentialResponse.credential);
//     navigate('/dashboard'); // Redirect to dashboard after successful Google sign-in
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google Sign-In Failed:', error);
//   };

//   const handleForgotPassword = () => {
//     navigate('/forgot-password');
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='flex w-full h-screen'>
//         <div className='w-1/2 flex flex-col justify-center items-start p-10 ml-10'>
//           <div className='flex justify-between w-[80%] mb-4 mt-8'>
//             <div></div>
//             <p>
//               Not a member? 
//               <a href="#" className="text-blue-700 underline hover:underline" style={{ color: '#0d6efd' }}> sign up now</a>
//             </p>
//           </div>
//           <h3 className='text-3xl mb-4'>Sign in</h3>
//           <form className='w-[80%]' onSubmit={handleSignIn}>
//             <div className='mb-4'>
//               <label className='block mb-1 text-xl text-gray-600'>Email Address</label>
//               <input 
//                 type="email" 
//                 className='p-4 text-xl w-full rounded-md' 
//                 style={{ backgroundColor: '#E8F0FE' }} 
//                 required 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='block mb-1 text-xl text-gray-600'>Password</label>
//               <input 
//                 type="password" 
//                 className='p-4 w-full rounded-md' 
//                 style={{ backgroundColor: '#E8F0FE' }} 
//                 required 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className='mb-4'>
//               <button 
//                 type="button" 
//                 onClick={handleForgotPassword} 
//                 className="text-blue-700 underline hover:underline" 
//                 style={{ color: '#0d6efd' }}
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <div className='mt-4'>
//               <Button type="submit" className='bg-black text-white normal-case w-full text-sm p-4'>
//                 Sign in
//               </Button>
//             </div>
//           </form>

//           <div className='mt-4'>
//             <GoogleLogin
//               onSuccess={handleGoogleSignIn}
//               onError={handleGoogleError}
//               render={renderProps => (
//                 <Button 
//                   onClick={renderProps.onClick}
//                   disabled={renderProps.disabled}
//                   className='bg-red-500 text-white normal-case w-full text-sm p-4'
//                 >
//                   Sign in with Google
//                 </Button>
//               )}
//             />
//           </div>

//           <div className='mt-4'>
//             <a href="#" className="text-blue-700 underline hover:underline" style={{ color: '#0d6efd' }}>
//               Sign in with LinkedIn
//             </a>
//           </div>
//         </div>
       
//         <div className='relative w-1/2 h-full'>
//           <img src={loginbg} alt="Login Background" className='object-cover w-full h-full' />
//           <div className='absolute inset-0 bg-black opacity-80 flex justify-center items-center'>
//             <div className='p-6 mx-8 max-w-3xl'>
//               <h2 className='text-white text-center text-4xl tracking-widest leading-normal font-bold m-0'>
//                 Join the largest job community in the world
//               </h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;  

import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/signinSlice'; // Adjust the path as needed
import loginbg from '../assets/images/LoginPageBg.jpg';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(signIn({ email, password }));
      if (signIn.fulfilled.match(action)) {
        // Save the token and navigate to dashboard
        localStorage.setItem('token', action.payload.token); // Save the token
        localStorage.setItem('jwt', action.payload.jwt); // Save the JWT
        localStorage.setItem('userid',action.payload.id);
        navigate('/dashboard', { replace: true }); // Redirect to dashboard after successful login
      } else {
        console.error('Sign in failed:', action.error.message);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleGoogleSignIn = (credentialResponse) => {
    console.log("sreenathcred",credentialResponse);
    localStorage.setItem('token', credentialResponse.credential);
    navigate('/registerform'); // Redirect to dashboard after successful Google sign-in
  };

  const handleGoogleError = (error) => {
    console.error('Google Sign-In Failed:', error);
  };

  const handlesignupnow = () => {
   navigate('/registerform');
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div>
      <Navbar />
      <div className='flex w-full h-screen'>
        <div className='w-1/2 flex flex-col justify-center items-start p-10 ml-10'>
          <div className='flex justify-between w-[80%] mb-4 mt-8'>
            <div></div>
            <p>
              Not a member? 
              <a href="#" className="text-blue-700 underline hover:underline" style={{ color: '#0d6efd' }} onClick={handlesignupnow}> sign up now</a>
            </p>
          </div>
          <h3 className='text-3xl mb-4'>Sign in</h3>
          <form className='w-[80%]' onSubmit={handleSignIn}>
            <div className='mb-4'>
              <label className='block mb-1 text-xl text-gray-600'>Email Address</label>
              <input 
                type="email" 
                className='p-4 text-xl w-full rounded-md' 
                style={{ backgroundColor: '#E8F0FE' }} 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-1 text-xl text-gray-600'>Password</label>
              <input 
                type="password" 
                className='p-4 w-full rounded-md' 
                style={{ backgroundColor: '#E8F0FE' }} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-blue-700 underline hover:underline" 
                style={{ color: '#0d6efd' }}
              >
                Forgot Password?
              </button>
            </div>

            <div className='mt-4'>
              <Button type="submit" className='bg-black text-white normal-case w-full text-sm p-4'>
                Sign in
              </Button>
            </div>
          </form>

          <div className='mt-4'>
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={handleGoogleError}
              render={renderProps => (
                <Button 
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='bg-red-500 text-white normal-case w-full text-sm p-4'
                >
                  Sign in with Google
                </Button>
              )}
            />
          </div>

          <div className='mt-4'>
            <a href="#" className="text-blue-700 underline hover:underline" style={{ color: '#0d6efd' }}>
              Sign in with LinkedIn
            </a>
          </div>
        </div>
       
        <div className='relative w-1/2 h-full'>
          <img src={loginbg} alt="Login Background" className='object-cover w-full h-full' />
          <div className='absolute inset-0 bg-black opacity-80 flex justify-center items-center'>
            <div className='p-6 mx-8 max-w-3xl'>
              <h2 className='text-white text-center text-4xl tracking-widest leading-normal font-bold m-0'>
                Join the largest job community in the world
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin; 

