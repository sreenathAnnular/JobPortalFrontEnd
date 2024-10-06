import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateTools = createAsyncThunk(
  'tools/updateTools',
  async (toolData, { getState }) => {
    const token = localStorage.getItem('jwt');
    const response = await axios.post('http://13.202.217.89:8080/profile/updateTools', toolData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

const toolsSlice = createSlice({
  name: 'tools',
  initialState: {
    status: 'idle',
    error: null,
    updatedTools: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTools.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTools.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updatedTools.push(action.payload);
      })
      .addCase(updateTools.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default toolsSlice.reducer;