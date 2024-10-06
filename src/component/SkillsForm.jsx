import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkills } from '../redux/skillsSlice';
import { Button, Typography, Input } from "@material-tailwind/react";

const SkillsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (userProfile.skillsList && userProfile.skillsList.length > 0) {
      setSkills(userProfile.skillsList);
    } else {
      setSkills([{ skillName: '', skillLastUsed: '' }]);
    }
  }, [userProfile.skillsList]);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { skillName: '', skillLastUsed: '' }]);
  };

//   const handleRemoveSkill = (index) => {
//     const updatedSkills = skills.filter((_, i) => i !== index);
//     setSkills(updatedSkills);
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSkills(skills));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mt-0 ">
        <Typography variant="h3" className="font-semibold">Education</Typography>
        <button onClick={onClose} className="text-gray-500 text-3xl">×</button>
      </div>
      <hr className="border-gray-500 mb-6" />
     

      {skills.map((skill, index) => (
        <div key={index} className="flex space-x-2">
          <Input
            label="Skill"
            value={skill.skillName}
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
            required
          />
          <Input
            label="Last Used"
            value={skill.skillLastUsed}
            className="w-full border border-gray-300 p-2 rounded-md"
            onChange={(e) => handleSkillChange(index, 'skillLastUsed', e.target.value)}
            required
          />
          {/* <Button
            color="red"
            buttonType="link"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={() => handleRemoveSkill(index)}
          >
            Remove
          </Button> */}
        </div>
      ))}
      <Button onClick={handleAddSkill} color="lightBlue" ripple="light">
        Add Skill
      </Button>
      <div className="flex justify-end space-x-2">
        {/* <Button onClick={onClose} color="gray" ripple="dark">
          Cancel
        </Button> */}
        <Button type="submit" color="black" className="w-full">Save</Button>
      </div>
    </form>
  );
};

export default SkillsForm;