import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateSkills = createAsyncThunk(
  'skills/updateSkills',
  async (skillsData, { getState }) => {
    const { userProfile } = getState();
    const token = localStorage.getItem('jwt');
    const response = await axios.post('http://13.202.217.89:8080/profile/updateSkills', {
      skillsWebModels: skillsData.map(skill => ({
        ...skill,
        userWebModel: {
          userId: userProfile.userId
        }
      }))
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the userProfile state instead of maintaining a separate skills state
        state.userProfile = {
          ...state.userProfile,
          skillsList: action.payload.skillsWebModels
        };
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default skillsSlice.reducer;