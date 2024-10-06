import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Input } from "@material-tailwind/react";
import { updateTools } from '../redux/toolsSlice';

const ToolsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    if (userProfile.projectList) {
      setTools(userProfile.projectList.map(project => ({
        projectId: project.projectId,
        projectTools: project.projectTools || ''
      })));
    }
  }, [userProfile.projectList]);

  const handleToolChange = (index, value) => {
    const updatedTools = [...tools];
    updatedTools[index].projectTools = value;
    setTools(updatedTools);
  };

//   const handleAddTool = () => {
//     setTools([...tools, { projectId: new-${Date.now()}, projectTools: '' }]);
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    tools.forEach(tool => {
      dispatch(updateTools(tool));
    });
    onClose();
  };

  return (
    <div className="p-4">
         <div className="flex justify-between items-center mb-4">
        <Typography variant="h3" className="font-semibold">Education</Typography>
        <button onClick={onClose} className="text-gray-500 text-3xl">×</button>
      </div>
      <hr className="border-gray-500 mb-4" />
      <Typography variant="h5" className="mb-4">Edit Tools</Typography>
      <form onSubmit={handleSubmit}>
        {tools.map((tool, index) => (
          <div key={tool.projectId} className="mb-4">
            <Input
              type="text"
              label={`Project ${index + 1} Tools`}
              value={tool.projectTools}
              onChange={(e) => handleToolChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        {/* <Button
          type="button"
          color="blue"
          className="mb-4 w-full"
          onClick={handleAddTool}
        >
          Add New Tool
        </Button> */}
        <div className="flex justify-end space-x-4">
          <Button type="submit" color="black" className="w-full">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default ToolsForm;