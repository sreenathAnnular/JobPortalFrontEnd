import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { updateProject } from '../redux/projectSlice';

const EditProjectForm = ({ project, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    projectId: '',
    projectCompany: '',
    projectName: '',
    projectFromDate: '',
    projectToDate: '',
    projectTools: '',
    projectSoftware: '',
    projectSummary: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        projectId: project.projectId || '',
        projectCompany: project.projectCompany || '',
        projectName: project.projectName || '',
        projectFromDate: project.projectFromDate || '',
        projectToDate: project.projectToDate || '',
        projectTools: project.projectTools || '',
        projectSoftware: project.projectSoftware || '',
        projectSummary: project.projectSummary || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      projectWebModelList: [
        {
          projectId: formData.projectId,
          projectCompany: formData.projectCompany,
          projectName: formData.projectName,
          projectFromDate: formData.projectFromDate,
          projectToDate: formData.projectToDate,
          projectTools: formData.projectTools,
          projectSoftware: formData.projectSoftware,
          projectSummary: formData.projectSummary,
        },
      ],
    };
  
    dispatch(updateProject(payload))
      .then(() => {
        console.log('Updated Project:', formData);
        onClose();
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3" className="font-semibold">Edit Project</Typography>
        <button onClick={onClose} className="text-gray-500 text-3xl">×</button>
      </div>

      <hr className="border-gray-500 mb-4" />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 mt-6 mb-4">
          <div>
            <label className="block">Project Company:</label>
            <input
              type="text"
              name="projectCompany"
              value={formData.projectCompany}
              onChange={handleChange}
              className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block">Project Name:</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block">Project Start Date:</label>
            <input
              type="date"
              name="projectFromDate"
              value={formData.projectFromDate}
              onChange={handleChange}
              className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block">Project End Date:</label>
            <input
              type="date"
              name="projectToDate"
              value={formData.projectToDate}
              onChange={handleChange}
              className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block">Project Tools:</label>
            <input
              type="text"
              name="projectTools"
              value={formData.projectTools}
              onChange={handleChange}
              className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block">Project Software:</label>
            <input
              type="text"
              name="projectSoftware"
              value={formData.projectSoftware}
              onChange={handleChange}
              className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
            />
          </div>

          <div className="col-span-2">
            <label className="block">Project Summary:</label>
            <textarea
              name="projectSummary"
              value={formData.projectSummary}
              onChange={handleChange}
              className="border p-3 h-24 w-full bg-gray-200 rounded-lg"
            />
          </div>
        </div>

        <div>
          <Button color="black" type="submit" className="mt-2 w-full text-[16px] font-thin">
            Save Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;

