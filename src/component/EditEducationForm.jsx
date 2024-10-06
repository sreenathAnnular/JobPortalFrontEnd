import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import { saveEducationData } from '../redux/educationSlice';
import { updateUserProfile } from '../redux/userProfileSlice'; // Adjust this import based on your file structure

const EditEducationForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);

  const [educationEntries, setEducationEntries] = useState([]);

  useEffect(() => {
    // Initialize educationEntries with data from userProfile
    if (userProfile.educationList && userProfile.educationList.length > 0) {
      setEducationEntries(userProfile.educationList.map(edu => ({
        educationId: edu.educationId,
        college: edu.collegeName,
        course: edu.courseName,
      })));
    } else {
      // If no education data, start with one empty entry
      setEducationEntries([{ college: '', course: '' }]);
    }
  }, [userProfile]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEntries = [...educationEntries];
    updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    setEducationEntries(updatedEntries);
  };

  const addNewEducationEntry = () => {
    setEducationEntries([...educationEntries, { college: '', course: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const educationWebModelList = educationEntries.map(entry => ({
      educationId: entry.educationId, // Include if it exists
      collegeName: entry.college,
      courseName: entry.course,
      userWebModel: {
        userId: userProfile.userId // Assuming userId is available in userProfile
      }
    }));

    try {
      const response = await dispatch(saveEducationData({ educationWebModelList }));
      if (response.meta.requestStatus === 'fulfilled') {
        // Update the user profile with the new education data
        dispatch(updateUserProfile({
          ...userProfile,
          educationList: educationWebModelList, // Update this based on your userProfile structure
        }));
        onClose();
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3" className="font-semibold">Education</Typography>
        <button onClick={onClose} className="text-gray-500 text-3xl">×</button>
      </div>

      <hr className="border-gray-500 mb-4" />

      <form onSubmit={handleSubmit}>
        {educationEntries.map((entry, index) => (
          <div key={index} className="grid grid-cols-2 gap-8 mt-6 mb-4">
            <div>
              <label className="block">College:</label>
              <input
                type="text"
                name="college"
                value={entry.college}
                onChange={(e) => handleChange(index, e)}
                className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block">Course:</label>
              <input
                type="text"
                name="course"
                value={entry.course}
                onChange={(e) => handleChange(index, e)}
                className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
                required
              />
            </div>
          </div>
        ))}

        <div className="flex space-x-2">
          <Button type="button" color="black" onClick={addNewEducationEntry} className="mt-2 ml-auto font-thin text-[14px] normal-case">
            Add
          </Button>
        </div>

        <div>
          <Button color="black" type="submit" className="mt-2 w-full text-[16px] font-thin">
            UPDATE EDUCATION INFO
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEducationForm;  