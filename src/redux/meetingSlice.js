import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for scheduling a meeting
export const scheduleMeeting = createAsyncThunk(
  'meeting/scheduleMeeting',
  async ({ meetingData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://13.202.217.89:8080/meeting/scheduleMeeting',
        meetingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Adjust this if your API returns a different structure
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to schedule meeting');
    }
  }
);

// Create a slice for meeting management
const meetingSlice = createSlice({
  name: 'meeting',
  initialState: {
    meetings: [], // Add this to hold scheduled meetings
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addMeetingToDashboard: (state, action) => {
      state.meetings.push(action.payload); // Push the new meeting into the meetings array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleMeeting.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(scheduleMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions
export const { clearError, addMeetingToDashboard } = meetingSlice.actions;

// Export the reducer
export default meetingSlice.reducer; 