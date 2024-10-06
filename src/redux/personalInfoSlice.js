import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile } from './userProfileSlice'; // Import fetchUserProfile to update profile after success
import axios from 'axios';

const initialState = {
  userInfo: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async thunk to update user information and send JWT token
export const updateUserInfoAsync = createAsyncThunk(
  'userInfo/updateUserInfo',
  async (userData, { rejectWithValue, dispatch }) => { // Add dispatch here to trigger other actions
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('jwt');

      // Make the API request with the JWT token in headers
      const response = await axios.post(
        'http://13.202.217.89:8080/profile/updatePersonalInfo',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      // Dispatch the action to fetch the updated user profile
      const userId=localStorage.getItem('userid');
      dispatch(fetchUserProfile(userId)); // Fetch the updated profile after a successful update

      return response.data; // Return the response data for the fulfilled case
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update personal info');
    }
  }
);

const personalInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload; // Update the userInfo state with the updated data
      })
      .addCase(updateUserInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Handle any error that occurs
      });
  },
});

export default personalInfoSlice.reducer;
