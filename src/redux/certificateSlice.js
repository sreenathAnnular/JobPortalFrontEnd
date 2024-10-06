import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for updating certificates
export const updateCertificates = createAsyncThunk(
  'certificates/updateCertificates',
  async (certificationWebModels, { rejectWithValue }) => {
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('jwt');

      // Make the API request with the JWT token in headers
      const response = await axios.post('http://13.202.217.89:8080/profile/updateCertificates', {
        certificationWebModels
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
      });
      console.log("response",response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState: {
    certificates: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCertificates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCertificates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.certificates = action.payload;
      })
      .addCase(updateCertificates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default certificateSlice.reducer;
