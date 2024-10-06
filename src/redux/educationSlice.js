import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the education slice
const initialState = {
  educationData: [],
  loading: false,
  error: null,
};

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('jwt');
};

// Async thunk for saving education data
export const saveEducationData = createAsyncThunk(
  'education/saveEducationData',
  async (educationEntries, { rejectWithValue }) => {
    try {
      const token = getToken(); // Retrieve the token from localStorage
      const response = await axios.post(
        'http://13.202.217.89:8080/profile/updateEducation',
        educationEntries,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Set the authorization header
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Create the education slice
const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    // Additional reducers can go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveEducationData.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(saveEducationData.fulfilled, (state, action) => {
        state.loading = false;
        state.educationData = action.payload; // Update the education data with the response
      })
      .addCase(saveEducationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error if the API call fails
      });
  },
});

// Export actions and reducer
export default educationSlice.reducer;
