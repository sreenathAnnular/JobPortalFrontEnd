import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import Navbar from "./Navbar";
import { MdModeEdit } from "react-icons/md";
import EditIcon from '@mui/icons-material/Edit';
import EditProjectForm from './EditProjectForm '
import EditPersonalInfoForm from './EditPersonalInfoForm';
import EditEducationForm from './EditEducationForm';
import EditCertificateForm from "./EditCertificateForm";
import { CiPhone, CiMail } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { fetchUserProfile } from '../redux/userProfileSlice'
import  { useLocation } from 'react-router-dom';
import SkillsForm from "./SkillsForm";
import ToolsForm from "./ToolsForm";
import axios from "axios";

const UserProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isShare = queryParams.get('isShare') === 'true';
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const toolsState = useSelector((state) => state.tools); 
  const skills=useSelector((state)=>state.skills);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [EditCertificate, SetEditCertificate] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
const [isEditingSkills, setIsEditingSkills] = useState(false);
const [isEditingTools, setIsEditingTools] = useState(false); 



  useEffect(() => {
    // Fetch user profile data when component mounts
    const userId=localStorage.getItem('userid');
    dispatch(fetchUserProfile(userId)); // Replace 17 with the actual userId
  }, [dispatch]);

  useEffect(() => {
    if (toolsState.status === 'succeeded' && toolsState.updatedTools.length > 0) {
      dispatch(fetchUserProfile(userProfile.userId));
    }
  },  [toolsState.status, toolsState.updatedTools]); 

  useEffect(()=>{
    if(skills.status === `succeeded`)
      dispatch(fetchUserProfile(userProfile.userId));
  },[skills.status])


  // useEffect(() => {
  //   // Log the user profile data whenever it changes
  //   // console.log("User Profile Data:", userProfile);
  // }, [userProfile]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage
    const userId = localStorage.getItem('userid');
  
    if (file && token) {
      const formData = new FormData();
      
      // Append all required fields exactly as the server expects
      formData.append('userId', userId);
      formData.append('fileName', file.name);
      formData.append('fileType', file.type.split('/')[1]); // Extract only the subtype (e.g., 'mp4' from 'video/mp4')
      formData.append('fileSize', `${(file.size / (1024 * 1024)).toFixed(1)}mb`); // Convert to MB with one decimal place
      formData.append('selfIntro', file); // Note the capital 'I' in 'selfIntro'

      // Log FormData contents (for debugging)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      try {
        // Send POST request with formData
        const response = await axios.post('http://13.202.217.89:8080/profile/uploadSelfIntroVideo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        console.log('Upload successful:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No file selected or JWT token missing');
    }
  };
 

  const handleEditProjectClick = (project) => {
    setCurrentProject(project);
    setIsEditingProject(true);
  };

  const handleEditPersonalClick = () => {
    setIsEditingPersonal(true);
  };

  const handleEditCertificateClick = () => {
    SetEditCertificate(true);
  };

  const handleEditEducationClick = () => {
    setIsEditingEducation(true);
  };

  const handleCloseProjectForm = () => {
    setIsEditingProject(false);
    setCurrentProject(null);
    // Fetch the updated user profile data to refresh the UI
    dispatch(fetchUserProfile(userProfile.userId));
  };

  const handleClosePersonalForm = () => {
    setIsEditingPersonal(false);
  };

  const handleCloseCertificateForm = () => {
    SetEditCertificate(false);
  };

  const handleEditSkillsClick = () => {
    setIsEditingSkills(true);
  };

  const handleCloseSkillsForm = () => {
    setIsEditingSkills(false);
    dispatch(fetchUserProfile(userProfile.userId));
  };

  const handleEditToolsClick = () => {
    setIsEditingTools(true);
  };

  const handleCloseToolsForm = () => {
    setIsEditingTools(false);
    dispatch(fetchUserProfile(userProfile.userId));
  }; 



  const handleCloseEducationForm = () => {
    setIsEditingEducation(false);
  };

const shareLink = `${window.location.origin}/profile/${userProfile.userId}?isShare=true`; 

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'User Profile',
      text: 'Check out this amazing profile!',
      url: shareLink,
    }).catch((error) => console.log('Error sharing:', error));
  } else {
    setIsShareDialogOpen(true);
  }
};

const shareOnPlatform = (platform) => {
  let url;
  switch (platform) {
    case 'whatsapp':
      url = `https://wa.me/?text=Check out this profile: ${encodeURIComponent(shareLink)}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
      break;
    case 'twitter':
      url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=Check out this profile!`;
      break;
    case 'linkedin':
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
      break;
    default:
      return;
  }
  window.open(url, '_blank');
};

   const handleViewProfile = () => {
    const viewProfileWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>${userProfile.firstName} ${userProfile.lastName} - Profile</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="max-w-6xl mx-auto p-5 mt-16">
            <h1 class="text-2xl font-bold mb-4 text-green-600">${userProfile.firstName} ${userProfile.lastName}</h1>
            <p class="mb-2">${userProfile.email}</p>
            <p class="mb-4">${userProfile.phoneNumber}</p>
  
            <h2 class="text-xl font-semibold mt-6 mb-2 text-green-600">Summary</h2>
            <p class="mb-4">${userProfile.selfDescription}</p>
  
            <h2 class="text-xl font-semibold mt-6 mb-2 text-green-600">Education</h2>
            ${userProfile.educationList.map(edu => `
              <div class="mb-2">
                <p><strong>${edu.courseName}</strong> - ${edu.collegeName}</p>
              </div>
            `).join('')}
  
            <h2 class="text-xl font-semibold mt-6 mb-2 text-green-600">Certifications</h2>
            ${userProfile.certificationList.map(cert => `
              <div class="mb-2">
                <p><strong>${cert.certificateName}</strong></p>
                <p>Year: ${cert.year}, Expires: ${cert.expirationMonth}</p>
              </div>
            `).join('')}
  
            <h2 class="text-xl font-semibold mt-6 mb-2 text-green-600">Projects</h2>
            ${userProfile.projectList.map(project => `
              <div class="mb-4">
                <p><strong>${project.projectCompany}</strong></p>
                <p>${new Date(project.projectFromDate).toLocaleDateString()} to ${new Date(project.projectToDate).toLocaleDateString()}</p>
                <p>${project.projectSummary}</p>
              </div>
            `).join('')}
  
            <h2 class="text-xl font-semibold mt-6 mb-2 text-green-600">Skills</h2>
            <ul class="list-disc pl-5">
              ${userProfile.skillsList.map(skill => `<li>${skill.skillName} -${skill.skillLastUsed}</li>`).join('')}
            </ul>
  
            <h2 class="text-xl font-semibold mt-6 mb-2 text-green-600">Tools</h2>
            <ul class="list-disc pl-5">
              ${userProfile.projectList.map(project => `<li>${project.projectTools}</li>`).join('')}
            </ul>
          </div>
        </body>
      </html>
    `;
    viewProfileWindow.document.write(content);
    viewProfileWindow.document.close();
  };  

 const renderProfile = (isViewOnly = false) => {
    if (userProfile.loading === 'loading') {
      return <div>Loading...</div>;
    }

    if (userProfile.loading === 'failed') {
      return <div>Error: {userProfile.error && typeof userProfile.error === 'object' ? JSON.stringify(userProfile.error) : userProfile.error}</div>;
    }



  return (
   <>
        {/* Personal Info Section */}
        <div className="mb-8 p-4 flex items-start">
          <div className="flex-1">
            <Typography className="mb-2 text-[14px]" style={{ color: '#424242' }}>Self Introduction</Typography>
            {!isViewOnly && <input type="file" className="block mb-4" onChange={handleFileChange} />}
          </div> 

          <div className="mb-2 flex flex-col mr-[540px]">
            <div className="">
              <Typography className="text-14px" style={{color:`#0E9810`}}>{userProfile.firstName} {userProfile.lastName}</Typography>
              <Typography className="text-gray-600 text-14px" style={{color:`#212529`}}>{userProfile.email}</Typography>
            </div>
            {!isViewOnly && (
              <div className="flex space-x-4 mt-1">
                <Button size="sm" className="normal-case text-14px text-white" style={{background:`#198754`}} onClick={handleShare}>Share</Button>
                <Button size="sm" className="normal-case text-14px text-white" style={{background:`#0D6EFD`}} onClick={handleViewProfile}>View Profile</Button>
              </div>
            )}
          </div>
        </div> 
        <hr className="my-2 border-dashed border-gray-500" />

        {/* Summary and Education Section */}
        <div className="mb-8 p-4 flex">
          <div className="flex-1">
            <Typography variant="h5" className="text-sm flex gap-2 items-center font-thin" style={{color:`#0E9810`,}}>
              SUMMARY 
{!isShare && (<MdModeEdit style={{color:`#0E9810`}} className="cursor-pointer text-gray-600" onClick={handleEditPersonalClick} />)}
            </Typography>
            <Typography>{userProfile.selfDescription}</Typography>

            <div className="mt-4">
              <Typography variant="h5" className="text-sm font-thin" style={{color:`#0E9810`,}}>EDUCATION</Typography>
            {!isShare && (<div>
                <Button className="normal-case rounded-md flex gap-2 items-center p-1.5 font-thin text-white text-sm" style={{background:`#0E9810`}} onClick={handleEditEducationClick}>
                  <MdModeEdit /> Edit Education
                </Button>
              </div>)} 
              {userProfile.educationList.map((education, index) => (
                <Typography key={index}>{education.courseName} - {education.collegeName}</Typography>
              ))}
{!isShare && (
  <div className="flex flex-col space-y-1 mt-3">
    <Typography variant="h5" className="text-sm font-thin" style={{ color: `#0E9810` }}>
      CERTIFICATE
    </Typography>

    <div className>
      {userProfile.certificationList.map((certication, index) => (
        <div key={index} className="mb-2">
          <Typography>{certication.certificateName}</Typography>
          <Typography>{certication.expirationMonth},{certication.year}</Typography>
          
        </div>
      ))}

      {/* Move the Edit button below the certificate information */}
      <div className="mt-4">
        <Button
          className="normal-case rounded-md flex gap-2 items-center p-1.5 font-thin text-white text-sm"
          style={{ background: `#0E9810` }}
          onClick={handleEditCertificateClick}
        >
          <MdModeEdit />
          Edit Certificate
        </Button>
      </div>
    </div>
  </div>
)}

            </div>
          </div>
          <div className="flex-1 pl-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="text-sm flex gap-2 items-center font-thin" style={{color:`#0E9810`}}>
            PROJECTS 
          </Typography>
        </div>
            {userProfile.projectList.map((project, index) => (
          <div key={index}>
            <Typography>{project.projectCompany} ({new Date(project.projectFromDate).toLocaleDateString()} to {new Date(project.projectToDate).toLocaleDateString()})</Typography>
            <Typography>{project.projectSummary}</Typography>
            {!isShare && (
              <Button
                size="sm"
                className="normal-case text-14px text-white mt-2"
                style={{background:`#0E9810`}}
                onClick={() => handleEditProjectClick(project)}
              >
                Edit Project
              </Button>
            )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8 p-4 flex gap-4 border-t border-dotted border-gray-400">
          {/* Contact Information Section */}
          <div className=" p-2 flex-1">
            <div className="flex gap-4 mt-2">
              <Typography className="flex items-center gap-1 text-md">
                <CiPhone style={{ color: `#0E9810` }} /> {userProfile.phoneNumber}
              </Typography>
              <Typography className="flex items-center gap-1 text-md">
                <CiMail style={{ color: `#0E9810` }} /> {userProfile.email}
              </Typography>
            </div>
          </div>

          {/* Skills Section */}
          <div className="p-2 flex-1 ml-36">
            <Typography variant="h6" className="font-thin text-sm flex items-center gap-3" style={{color:'#0E9810'}}>
              SKILLS
              {!isViewOnly && (
                <MdModeEdit 
                  onClick={handleEditSkillsClick} 
                  className="cursor-pointer"
                />
              )}
            </Typography>
            <ul className="list-disc pl-5 mt-2">
              {userProfile.skillsList && userProfile.skillsList.map((skill, index) => (
                <li key={index}>
                  <Typography variant="body1">{skill.skillName} -{skill.skillLastUsed}</Typography>
                  
                </li>
              ))}
            </ul>
          </div> 


          {/* Tools Section */}
          <div className=" p-2 flex-1">
            <Typography variant="h6" className="font-thin text-sm flex items-center gap-3" style={{color:'#0E9810'}}>
              TOOLS
              {!isViewOnly && (
                <MdModeEdit 
              onClick={handleEditToolsClick} 
                  className="cursor-pointer"
              />)}
            </Typography>
            <ul className="list-disc pl-5 mt-2">
              {userProfile.projectList.map((project, index) => (
                <li key={index}>
                  <Typography variant="body1">{project.projectTools}</Typography>
                </li>
              ))}
            </ul>
          </div>

        </div>
</>
);
};
 return(
<div>
 {!isShare && <Navbar />}  
 <div className="max-w-6xl mx-auto p-5 mt-16">
 {renderProfile(isShare)} 

        {!isShare && isEditingProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-3/4 min-h-1/2 p-14">
            <EditProjectForm 
              project={currentProject} 
              onClose={handleCloseProjectForm}
            />
          </div>
        </div>
      )}

        {!isShare && isEditingPersonal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div className="bg-white w-3/4  p-10 mt-10">
              <EditPersonalInfoForm 
                userInfo={userProfile} 
                onClose={handleClosePersonalForm}
              />
            </div>
          </div>
        )}

        {!isShare && isEditingEducation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 min-h-3/4 p-3 rounded-md">
              <div className="flex">
              </div>
              <p className=" border-gray-400 mt-3"></p>
              <EditEducationForm onClose={handleCloseEducationForm} className="w-full" />
            </div>
          </div>
        )}

{!isShare && isEditingSkills && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 min-h-1/2 p-14">
              <SkillsForm onClose={handleCloseSkillsForm} />
            </div>
          </div>
        )} 

{!isShare && isEditingTools && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 min-h-1/2 p-14">
              <ToolsForm onClose={handleCloseToolsForm} />
            </div>
          </div>
        )}  



        {!isShare && EditCertificate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 min-h-3/4 p-10">
              <EditCertificateForm userInfo={userProfile} certificationList={userProfile.certificationList}  onClose={handleCloseCertificateForm} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;   