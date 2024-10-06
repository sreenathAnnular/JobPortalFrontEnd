import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('jwt');
};

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log("JWT Token:", token);

      const response = await axios.get(`http://13.202.217.89:8080/profile/getProfile`, {
        params: { userId },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Response from API:", response.data.data.data);
      return response.data.data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userId: null,
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    educationList: [],
    certificationList: [],
    projectList: [],
    skillsList: [],
    gender: '',
    city: '',
    state: '',
    address: '',
    selfDescription: '',
    zip: '',
    phoneNumber: '',
    willingToRelocate: false,
    remote: false,
    hybrid: false,
    sponsorshipRequired: false,
    loading: 'idle',
    error: null,
  },
  reducers: {
    // Add the updateUserProfile reducer here
    updateUserProfile(state, action) {
      // Here we update the user profile with the new data
      const { educationList } = action.payload;
      state.educationList = educationList; // Update only the education list or add other fields as needed
    },
    updateProject(state, action) {
      const updatedProject = action.payload;
      const index = state.projectList.findIndex(p => p.projectId === updatedProject.projectId);
      if (index !== -1) {
        state.projectList[index] = updatedProject;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the actions
export const { updateUserProfile, updateProject } = userProfileSlice.actions;
export default userProfileSlice.reducer; 