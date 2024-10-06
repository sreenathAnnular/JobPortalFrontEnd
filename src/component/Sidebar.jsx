import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calender.css';
import { IoCloseOutline } from "react-icons/io5";
import { fetchScheduleByDate} from '../redux/scheduleSlice'
import {scheduleMeeting} from '../redux/meetingSlice'

const Sidebar = ({ token }) => { // Ensure token is passed as a prop or obtained from somewhere
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector(state => state.schedule);
  const [date, setDate] = useState(new Date());
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowButton(true);
    const formattedDate = newDate.toISOString().split('T')[0];
    dispatch(fetchScheduleByDate(formattedDate));
  };

  const handleAddMeeting = () => {
    setShowModal(true);
  };

  

  const handleSubmit = () => {
    const token = localStorage.getItem('jwt');
  
    if (!token) {
      console.error('No authorization token found. Please log in.');
      alert('Please log in to schedule a meeting.');
      return;
    }

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const meetingData = {
      meetingDate: date.toISOString().split('T')[0],
      meetingTime: time,
      meetingDescription: description,
    };

    dispatch(scheduleMeeting({ meetingData, token }))
      .unwrap()
      .then(() => {
        setTime('');
        setDescription('');
        setShowModal(false);
        // Refresh the schedule after adding a new meeting
        dispatch(fetchScheduleByDate(meetingData.meetingDate));
      })
      .catch((error) => {
        console.error('Failed to schedule meeting:', error);
      });
  };

  return (
    <div className="w-[27%] h-screen bg-gray-200 p-4 fixed left-0 top-0 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-5">Jobs Engine</h1>

      <div className="flex-grow flex items-start justify-center mt-[10%]">
        <div className="flex flex-col items-center">
          <div className="mt-2 mr-1.5">
            <Calendar 
              onChange={handleDateChange} 
              value={date} 
              className="rounded-md text-gray-500 bg-gray-200 border-none custom-calendar"
              style={{ color: 'rgba(0, 0, 0, 0.87)' }}
              formatShortWeekday={(locale, date) => 
                ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
              }
            />
          </div>

          {showButton && (
            <div className="mt-2 w-[70%]">
              <button 
                onClick={handleAddMeeting} 
                className="bg-black w-full text-white px-4 py-2 rounded-md shadow-md mt-5"
              >
                Add Meeting
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-1/4">
            <div className='flex justify-between'>
              <h2 className="text-xl font-bold mb-4">Time & Description</h2>
              <div className=''><IoCloseOutline className='text-2xl' onClick={() => setShowModal(false)} /></div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Time:</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                className="rounded-md w-full p-2"
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="rounded-md w-full p-2"
                rows="2"
                required 
              />
            </div>
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit} 
                className="bg-black text-white px-4 py-2 rounded-md w-full"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
