import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchScheduleByDate = createAsyncThunk(
  'schedule/fetchByDate',
  async (date, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem('jwt'); 

      const response = await axios.post(
        'http://13.202.217.89:8080/meeting/getScheduleByDate',
        { meetingDate: date },
        {
          headers: {
            'Authorization': `Bearer ${jwt}`, // Include JWT token in the request header
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    meetings: [],
    status: 'idle',
    error: null,
    selectedMeeting: null
  },
  reducers: {
    setSelectedMeeting: (state, action) => {
      state.selectedMeeting = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleByDate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchScheduleByDate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
      })
      .addCase(fetchScheduleByDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setSelectedMeeting,scheduleMeeting  } = scheduleSlice.actions;
export default scheduleSlice.reducer;