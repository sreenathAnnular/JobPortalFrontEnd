import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import FormNavbar from './FormNavbar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  updateField,
  addEducation,
  addCertification,
  updateCertification,
  removeCertification,
  addProject,
  updateProject,
  removeProject,
  setResumeFile,
  resetForm,
  updateEducation,
  submitRegisterForm,
  addSkill,
  updateSkill,
  removeSkill,
} from '../redux/registerFormSlice'

const RegisterForm = () => {
  const formData = useSelector((state) => state.registerForm);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [isresume,setisresume]=useState(null);
  const [batchId, setBatchId] = useState(null);
  const [extractionId, setExtractionId] = useState(null);
  const [batchResults, setBatchResults] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [skillsList, setSkillsList] = useState([
    { skillName: '', skillLastUsed: '' }
]); 

const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCertificateFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  // const handleresumefilechanges =(e) =>{
  //   setisresume(e.target.file[0])
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };  


  const handleEducationChange = (index, field, value) => {
    dispatch(updateEducation({ index, field, value }));
  };

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleRemoveEducation = (index) => {
    dispatch(removeEducation(index));
  };

  const handleCertificationChange = (index, field, value) => {
    dispatch(updateCertification({ index, field, value }));
  };

  const handleAddCertification = () => {
    dispatch(addCertification());
  };

  const handleRemoveCertification = (index) => {
    dispatch(removeCertification(index));
  };

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleProjectChange = (index, field, value) => {
    const stateField = field === 'projectFrom' ? 'projectFromDate' :
    field === 'projectTo' ? 'projectToDate' :
    field;
    dispatch(updateProject({ index, field: stateField, value }));
  };

  const handleAddSkill = () => {
    dispatch(addSkill());
  };

  const handleSkillChange = (index, field, value) => {
    dispatch(updateSkill({ index, field, value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let resumeFileData = null;
    if (file) {
      const base64 = await fileToBase64(file);
      resumeFileData = {
        fileName: file.name,
        fileSize: `${file.size}B`,
        fileType: file.type,
        fileData: base64
      };
    }
    console.log("formdata",formData);
    const formDataToSubmit = {
      ...formData,
      willingToRelocate: formData.willing_to_relocate === 'yes',
      remote: formData.remote === 'yes',
      hybrid: formData.hybrid === 'yes',
      sponsorshipRequired: formData.sponsorship_required === 'yes',
      selfDescription: formData.about_yourself,
      // projectList: [
      //   {
      //     projectCompany: formData.company,
      //     projectName: formData.project_name,
      //     projectFromDate: formData.from,
      //     projectToDate: formData.to,
      //     projectTools: formData.tools,
      //     projectSummary: formData.project_summary,
      //     projectSoftware: formData.software
      //   }
      // ],
      // skillsList:[
      //   {
      //     skillName:formData.skillname,
      //     skillLastUsed:formData.lastused
      //   }

      // ],
       filesInputWebModel: resumeFileData
 

      
    };
  
    console.log("form-submitted", formDataToSubmit);
    try {
      const result = await dispatch(submitRegisterForm(formDataToSubmit)).unwrap();
      console.log("Form submitted successfully:", result.data.userId);
      toast.success('Registered Successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Registration failed. Please try again.');
    }
  };


  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('extractionId', '-O8T10YbBkHRXIzx7UN5');
    formData.append('files', file);

    toast.promise(
      axios.post('https://api.extracta.ai/api/v1/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer NjM1MTM1Njky_34nyq9v8y6d7s7qfht3sek'
        }
      }),
      {
        loading: 'Uploading...',
        success: 'File uploaded successfully!',
        error: 'Upload failed. Please try again.',
      }
    ).then(response => {
      console.log('Upload successful:', response.data);
      const { batchId: newBatchId, extractionId: newExtractionId } = response.data;
      localStorage.setItem("batchId", newBatchId);
      localStorage.setItem("extractionId", newExtractionId);
      setBatchId(newBatchId);
      setExtractionId(newExtractionId);
      setIsExtracting(true);
      pollExtractionStatus(newExtractionId, newBatchId);
    }).catch(error => {
      console.error('Upload failed:', error);
    });
  };
  const updateFormWithExtractedData = (data) => {
    if (data.personal_info) {
      dispatch(updateField({ field: 'firstName', value: data.personal_info.name.split(' ')[0] || '' }));
      dispatch(updateField({ field: 'lastName', value: data.personal_info.name.split(' ').slice(1).join(' ') || '' }));
      dispatch(updateField({ field: 'email', value: data.personal_info.email || '' }));
      dispatch(updateField({ field: 'phoneNumber', value: data.personal_info.phone || '' }));
      dispatch(updateField({ field: 'address', value: data.personal_info.address || '' }));
    }
  
    if (data.education && data.education.length > 0) {
      const education = data.education[0];
      dispatch(updateField({ field: 'college', value: education.institute || '' }));
      dispatch(updateField({ field: 'course', value: education.title || '' }));
    }
  
    if (data.certificates && data.certificates.length > 0) {
      dispatch(updateField({ field: 'certificate_name', value: data.certificates[0] || '' }));
    }
  
    if (data.skills && data.skills.length > 0) {
      dispatch(updateField({ field: 'skills', value: data.skills.join(', ') }));
    }
  
    if (data.project && Array.isArray(data.project)) {
    data.project.forEach((project, index) => {
      if (index === 0) {
        // Update the existing fields for the first project
        dispatch(updateField({ field: 'company', value: project.company || '' }));
        dispatch(updateField({ field: 'project_name', value: project.name || '' }));
        dispatch(updateField({ field: 'from', value: project.start_date || '' }));
        dispatch(updateField({ field: 'to', value: project.end_date || '' }));
        dispatch(updateField({ field: 'project_summary', value: project.description || '' }));
        dispatch(updateField({ field: 'tools', value: project.tools ? project.tools.join(', ') : '' }));
        dispatch(updateField({ field: 'software', value: project.software ? project.software.join(', ') : '' }));
      } else {
        // Add additional projects
        dispatch(addProject({
          company: project.company || '',
          project_name: project.name || '',
          from: project.start_date || '',
          to: project.end_date || '',
          project_summary: project.description || '',
          tools: project.tools ? project.tools.join(', ') : '',
          software: project.software ? project.software.join(', ') : ''
        }));
      }
    });
  } else if (typeof data.projects === 'string') {
    // If projects is still a string, split it and create simple project objects
    const projectNames = data.projects.split(', ');
    projectNames.forEach((projectName, index) => {
      if (index === 0) {
        dispatch(updateField({ field: 'project_name', value: projectName }));
      } else {
        dispatch(addProject({ project_name: projectName }));
      }
    });
  }

  if (data.summary) {
    dispatch(updateField({ field: 'about_yourself', value: data.summary || '' }));
  }
  };

  const pollExtractionStatus = async (extractionId, batchId) => {
    const maxAttempts = 6;
    const pollingInterval = 5000; // 5 seconds
  
    const extractionPromise = new Promise(async (resolve, reject) => {
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const response = await axios.post('https://api.extracta.ai/api/v1/getBatchResults', {
            extractionId: extractionId,
            batchId: batchId,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer NjM1MTM1Njky_34nyq9v8y6d7s7qfht3sek',
            },
          });

          if (response.data && response.data.files && Object.keys(response.data.files).length === 0) {
            setIsExtracting(false);
            console.log('Extraction completed with empty files object');
            resolve('Extraction completed successfully');
            break;
          } else if (response.data && response.data.files && response.data.files.length > 0) {
            setIsExtracting(false);
            setBatchResults(response.data);
            
            const fileData = response.data.files[0].result;
            setExtractedData(fileData);
            
            console.log('Extraction completed:', fileData);
            updateFormWithExtractedData(fileData);
            resolve('Extraction completed successfully');
            break;
          } else if (response.data && response.data.error) {
            console.error('API returned an error:', response.data.error);
            setIsExtracting(false);
            reject(`Extraction failed: ${response.data.error}`);
            break;
          } else {
            console.log(`Extraction in progress. Attempt ${attempt + 1} of ${maxAttempts}`);
          }

          await new Promise(resolve => setTimeout(resolve, pollingInterval));
        } catch (error) {
          console.error('Failed to fetch batch results:', error);
          setIsExtracting(false);
          reject('Failed to fetch extraction results. Please try again.');
          break;
        }
      }

      if (isExtracting) {
        setIsExtracting(false);
        console.log('Extraction timed out');
        reject('Extraction process took too long. Please try again or proceed with manual input.');
      }
    });

    toast.promise(
      extractionPromise,
      {
        loading: 'Extracting data...',
        success: 'Data extracted successfully!',
        error: (err) => `${err}`,
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#f1f5f7]">
      <FormNavbar/>
      <Toaster/>
      <div className="max-w-6xl mx-auto p-5 mt-10">
        <div className="flex justify-center">
          <form className="border bg-white p-5 w-full" onSubmit={handleSubmit}>
            <h2 className="font-bold text-3xl mb-6">Register</h2>

            {/* Resume Upload Section */}
            <div className="flex flex-col mb-6">
              <label className="block text-sm text-gray-600 mb-2">Upload Resume</label>
              <div className="grid grid-cols-5 gap-4">
                <input
                  className="p-4 text-lg col-span-4 rounded-md bg-[#F5F5F6]"
                  type="file"
                  onChange={handleFileChange}
                  disabled={isExtracting}
                />
                <Button 
                  className="bg-black text-white normal-case text-lg p-4 col-span-1" 
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="mb-6">
              <h3 className="block text-lg mb-2 text-black font-bold">Contact Details</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">First Name</label>
                  <input 
                    className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                    type="text" 
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Middle Name</label>
                  <input 
                    className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                    type="text" 
                    name="middleName"
                    value={formData.middleName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Last Name</label>
                  <input 
                    className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                    type="text" 
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Phone Number', type: 'text', name: 'phoneNumber' },
                  { label: 'Email', type: 'email', name: 'email' },
                  { label: 'Password', type: 'password', name: 'password' },
                ].map(({ label, type, name }) => (
                  <div key={label} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">{label}</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type={type}
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* College and Course Section */}
            <div className="mb-6">
              <h3 className="block text-lg mb-2 text-black font-bold">Educational Details</h3>
              
              {formData.educationList.map((education, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">College</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="text"
                      value={education.collegeName || ''}
                      onChange={(e) => handleEducationChange(index, 'collegeName', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Course</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="text"
                      value={education.courseName || ''}
                      onChange={(e) => handleEducationChange(index, 'courseName', e.target.value)}
                    />
                  </div>
                  {formData.educationList.length > 1 && (
                    <Button 
                      className="bg-red-500 text-white normal-case text-lg px-6 py-3" 
                      onClick={() => handleRemoveEducation(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <Button 
                  className="bg-black text-white normal-case text-lg px-6 py-3" 
                  onClick={handleAddEducation}
                >
                  Add More Education
                </Button>
              </div>
              </div>

            {/* Certification Section */}
            <div className="mb-6">
              <h3 className="block text-lg mb-2 text-black font-bold">Certification</h3>
              {formData.certificationList.map((certification, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Upload Certificate</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="file" 
                      onChange={(e) => handleCertificationChange(index, 'file', e.target.files[0])}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Certificate Name</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="text"
                      value={certification.certificateName || ''}
                      onChange={(e) => handleCertificationChange(index, 'certificateName', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Year</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="text"
                      value={certification.year || ''}
                      onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Expiration Month</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="text"
                      value={certification.expirationMonth || ''}
                      onChange={(e) => handleCertificationChange(index, 'expirationMonth', e.target.value)}
                    />
                  </div>
                  {formData.certificationList.length > 1 && (
                    <Button 
                      className="bg-red-500 text-white normal-case text-lg px-6 py-3" 
                      onClick={() => handleRemoveCertification(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <Button 
                  className="bg-black text-white normal-case text-lg px-6 py-3" 
                  onClick={handleAddCertification}
                >
                  Add More Certification
                </Button>
              </div>
            </div>



            {/* Location Section */}
            <div className="mb-6">
              <h3 className="block text-lg mb-2 text-black font-bold">Location</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {['Address', 'City', 'State', 'Zip'].map((label) => (
                  <div key={label} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">{label}</label>
                    <input 
                      className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                      type="text"
                      name={label.toLowerCase()}
                      value={formData[label.toLowerCase()] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mode of Work Section */}
            <div className="mb-6">
              <div className="flex flex-wrap space-x-14">
                {['Willing to Relocate', 'Remote', 'Hybrid', 'Sponsorship Required'].map((label) => (
                  <div key={label} className="flex items-center space-x-2">
                    <label className="text-black font-bold">{label}</label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name={label.toLowerCase().replace(/ /g, '_')} 
                        value="yes" 
                        className="form-radio text-blue-600"
                        checked={formData[label.toLowerCase().replace(/ /g, '_')] === 'yes'}
                        onChange={handleInputChange}
                      />
                      <span className="ml-1">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name={label.toLowerCase().replace(/ /g, '_')} 
                        value="no" 
                        className="form-radio text-blue-600"
                        checked={formData[label.toLowerCase().replace(/ /g, '_')] === 'no'}
                        onChange={handleInputChange}
                      />
                      <span className="ml-1">No</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Section */}
            <div className="flex items-center space-x-2 mb-6">
              <label className="text-black font-bold">Gender</label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  className="form-radio text-blue-600"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                <span className="ml-1">Male</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  className="form-radio text-blue-600"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                <span className="ml-1">Female</span>
              </label>
            </div>

            {/* About Yourself Section */}
            <div className='flex flex-col mt-6 mb-6'>
              <label className="text-sm text-gray-600 mb-1">Please tell about yourself in 50-60 words</label>
              <input 
                className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                type="text"
                name="about_yourself"
                value={formData.about_yourself || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Details Section */}
            <div className="mb-6">
        <h3 className="block text-lg mb-2 text-black font-bold">Project Details</h3>
        {formData.projectList.map((project, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            {['Company', 'Project Name', 'From', 'To', 'Tools', 'Software'].map((label) => (
              <div key={label} className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">{label}</label>
                <input 
                  className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                  type={label === 'From' || label === 'To' ? 'date' : 'text'}
                  value={
                    label === 'From' ? project.projectFromDate :
                    label === 'To' ? project.projectToDate :
                    project[`project${label.replace(' ', '')}`] || ''
                  }
                  onChange={(e) => handleProjectChange(index, 
                    label === 'From' ? 'projectFrom' :
                    label === 'To' ? 'projectTo' :
                    `project${label.replace(' ', '')}`, 
                    e.target.value
                  )}
                />
              </div>
            ))}
            <div className="flex flex-col col-span-2">
              <label className="text-sm text-gray-600 mb-1">Summary</label>
              <input 
                className="p-3 text-lg border rounded-md bg-[#F5F5F6]" 
                type="text"
                value={project.projectSummary || ''}
                onChange={(e) => handleProjectChange(index, 'projectSummary', e.target.value)}
              />
            </div>
            {formData.projectList.length > 1 && (
              <Button 
                className="bg-red-500 text-white normal-case text-lg px-6 py-4" 
                onClick={() => dispatch(removeProject(index))}
              >
                Remove Project
              </Button>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <Button className="bg-black text-white normal-case text-lg px-6 py-3" onClick={handleAddProject}>
            Add Project
          </Button>
        </div>
      </div>


       {/* { Skills} */}  

       <div className="mb-6">
        <h3 className="block text-lg mb-2 text-black font-bold">Skills</h3>
        {formData.skillsList.map((skill, index) => (
          <div key={index} className='flex mb-2'>
            <div className="w-1/2 pr-2">
              <label className="text-sm text-gray-600 mb-1">Skill Name</label>
              <input 
                className="p-3 text-lg border rounded-md bg-[#F5F5F6] w-full" 
                type="text" 
                value={skill.skillName || ''}
                onChange={(e) => handleSkillChange(index, 'skillName', e.target.value)}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="text-sm text-gray-600 mb-1">Last Used</label>
              <input 
                className="p-3 text-lg border rounded-md bg-[#F5F5F6] w-full" 
                type="text" 
                placeholder='month,year'
                value={skill.skillLastUsed || ''}
                onChange={(e) => handleSkillChange(index, 'skillLastUsed', e.target.value)}
              />
            </div>
            {formData.skillsList.length > 1 && (
              <Button size="sm"
                className="bg-red-500 text-white normal-case text-sm px-3  ml-2" 
                onClick={() => dispatch(removeSkill(index))}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-2">
          <Button className="bg-black text-white normal-case text-lg px-6 py-3" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </div>
      </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" className='w-full normal-case text-lg'>Register</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

