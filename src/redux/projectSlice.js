 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (projectData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post(
        'http://13.202.217.89:8080/profile/updateProjects',
        projectData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Dispatch an action to update the userProfile state
      dispatch(updateUserProfileProject(response.data));
       console.log("data-project", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update project');
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    clearProjects(state) {
      state.projects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProject = action.payload;
        const index = state.projects.findIndex(p => p.projectId === updatedProject.projectId);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProjects, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;

// Action to update the userProfile state
export const updateUserProfileProject = (updatedProject) => ({
  type: 'userProfile/updateProject',
  payload: updatedProject,
});  