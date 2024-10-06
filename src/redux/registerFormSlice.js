import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Async thunk for posting register form data
export const submitRegisterForm = createAsyncThunk(
  'registerForm/submitRegisterForm',
  async (formData, { rejectWithValue }) => {
    try {
      console.log("try-formdata", formData)
      const response = await axios.post('http://13.202.217.89:8080/auth/register', formData);
      console.log("response after try", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  state: '',
  city: '',
  zip: '',
  phoneNumber: '',
  selfDescription: '',
  willingToRelocate: false,
  remote: false,
  hybrid: false,
  sponsorshipRequired: false,
  gender: '',
  summary: '',
  educationList: [{ collegeName: '', courseName: '' }],
  certificationList: [{ certificateName: '', year: '', expirationMonth: '', file: null }],
  skillsList: [{ skillName: '', skillLastUsed: '' }],
  projectList: [{
    projectCompany: '',
    projectName: '',
    projectFromDate: '',
    projectToDate: '',
    projectTools: '',
    projectSummary: '',
    projectSoftware: ''
  }],
  filesInputWebModel: null,
  status: 'idle', // status to track API call
  error: null, // to handle errors
};

const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addSkill: (state) => {
        state.skillsList.push({ skillName: '', skillLastUsed: '' });
      },
      updateSkill: (state, action) => {
        const { index, field, value } = action.payload;
        state.skillsList[index][field] = value;
      },
      removeSkill: (state, action) => {
        state.skillsList.splice(action.payload, 1);
      },
    addEducation: (state) => {
      state.educationList.push({ collegeName: '', courseName: '' });
    },
    updateEducation: (state, action) => {
      const { index, field, value } = action.payload;
      state.educationList[index][field] = value;
    },
    removeEducation: (state, action) => {
      state.educationList.splice(action.payload, 1);
    },
    addCertification: (state) => {
        state.certificationList.push({ certificateName: '', year: '', expirationMonth: '', file: null });
      },
      updateCertification: (state, action) => {
        const { index, field, value } = action.payload;
        state.certificationList[index][field] = value;
      },
      removeCertification: (state, action) => {
        state.certificationList.splice(action.payload, 1);
      },  
      addProject: (state) => {
        state.projectList.push({
          projectCompany: '',
          projectName: '',
          projectFromDate: '',
          projectToDate: '',
          projectTools: '',
          projectSummary: '',
          projectSoftware: ''
        });
      },
      updateProject: (state, action) => {
        const { index, field, value } = action.payload;
        state.projectList[index][field] = value;
      },
      removeProject: (state, action) => {
        state.projectList.splice(action.payload, 1);
      },
    setResumeFile: (state, action) => {
      state.filesInputWebModel = action.payload;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegisterForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitRegisterForm.fulfilled, (state) => {
        state.status = 'succeeded';
        // Optionally reset the form upon successful submission
        Object.assign(state, initialState);
      })
      .addCase(submitRegisterForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  updateField,
  addEducation,
  updateEducation,
  removeEducation,
  addCertification,
  updateCertification,
  removeCertification,
  addProject,
  updateProject,
  removeProject,
  setResumeFile,
  resetForm,
  addSkill,
  updateSkill,
  removeSkill,
} = registerFormSlice.actions;

export default registerFormSlice.reducer;
