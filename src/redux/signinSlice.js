 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 import axios from 'axios';
 
 const initialState = {
   user: null,
   token: null,
   jwt: null,
   status: 'idle',
   error: null,
 };
 
 export const signIn = createAsyncThunk('signin/signIn', async ({ email, password }, { rejectWithValue }) => {
   try {
     const response = await axios.post('http://13.202.217.89:8080/auth/login', {
       email,
       password,
     });
 
     // Store token and JWT in local storage
     localStorage.setItem('token', response.data.token);
     localStorage.setItem('jwt', response.data.jwt);
 
     return response.data;
   } catch (error) {
     return rejectWithValue(error.response?.data?.message || 'Failed to sign in');
   }
 });
 
 const signinSlice = createSlice({
   name: 'signin',
   initialState,
   reducers: {
     clearError: (state) => {
       state.error = null;
     },
     logout: (state) => {
       state.user = null;
       state.token = null;
       state.jwt = null;
       state.status = 'idle';
       localStorage.removeItem('token');
       localStorage.removeItem('jwt');
     },
   },
   extraReducers: (builder) => {
     builder
       .addCase(signIn.pending, (state) => {
         state.status = 'loading';
         state.error = null;
       })
       .addCase(signIn.fulfilled, (state, action) => {
         state.status = 'succeeded';
         state.user = {
           id: action.payload?.id,
           username: action.payload?.username,
           email: action.payload?.email,
         };
         state.token = action.payload?.token;
         state.jwt = action.payload?.jwt;
       })
       .addCase(signIn.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.payload;
       });
   },
 });
 
 export const { clearError, logout } = signinSlice.actions;
 export default signinSlice.reducer; 
