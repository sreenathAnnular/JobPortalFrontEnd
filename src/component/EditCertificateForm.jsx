import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { updateCertificates } from '../redux/certificateSlice';

const EditCertificateForm = ({ certificationList, onClose }) => {
  const dispatch = useDispatch();
  const [certificateInputs, setCertificateInputs] = useState([]);

  useEffect(() => {
    const initializeCertificates = async () => {
      const initializedCertificates = await Promise.all(certificationList.map(async cert => ({
        ...cert,
        file: cert.filesInputWebModel ? await base64ToFile(
          cert.filesInputWebModel.fileData,
          cert.filesInputWebModel.fileName,
          cert.filesInputWebModel.fileType
        ) : null
      })));
      setCertificateInputs(initializedCertificates.length > 0 ? initializedCertificates : [{ id: Date.now(), certificateName: '', year: '', expirationMonth: '', file: null }]);
    };

    initializeCertificates();
  }, [certificationList]);

  const base64ToFile = async (base64String, fileName, fileType) => {
    const res = await fetch(`data:${fileType};base64,${base64String}`);
    const blob = await res.blob();
    return new File([blob], fileName, { type: fileType });
  };

  const handleInputChange = (index, field, value) => {
    const updatedCertificates = [...certificateInputs];
    updatedCertificates[index][field] = value;
    setCertificateInputs(updatedCertificates);
  };

  const handleFileChange = (index, file) => {
    const updatedCertificates = [...certificateInputs];
    updatedCertificates[index].file = file;
    setCertificateInputs(updatedCertificates);
  };

  const addNewCertificate = () => {
    setCertificateInputs([...certificateInputs, { id: Date.now(), certificateName: '', year: '', expirationMonth: '', file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userid');
    try {
      const certificationWebModels = await Promise.all(certificateInputs.map(async cert => ({
        certificationId: cert.certificationId, // Include this if it exists
        certificateName: cert.certificateName,
        year: parseInt(cert.year),
        expirationMonth: cert.expirationMonth,
        userWebModel: {
          userId: userId
        },
        filesInputWebModel: cert.file ? {
          fileName: cert.file.name,
          fileSize: `${Math.round(cert.file.size / 1024)}KB`,
          fileType: cert.file.type,
          fileData: await fileToBase64(cert.file)
        } : null
      })));

      dispatch(updateCertificates(certificationWebModels));
      onClose();
    } catch (error) {
      console.error('Error submitting certificates:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h3" className="font-semibold">Certificates</Typography>
        <button onClick={onClose} className="text-gray-500 text-3xl">×</button>
      </div>

      <hr className="border-gray-500 mb-4" />

      <form onSubmit={handleSubmit}>
        {certificateInputs.map((certificate, index) => (
          <div key={index} className="grid grid-cols-2 gap-8 mt-6 mb-4">
            <div>
              <label className="block">Certificate Name:</label>
              <input
                type="text"
                placeholder="Certificate Name"
                value={certificate.certificateName}
                onChange={(e) => handleInputChange(index, 'certificateName', e.target.value)}
                className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block">Year:</label>
              <input
                type="number"
                placeholder="Year"
                value={certificate.year}
                onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block">Expiration Month:</label>
              <input
                type="text"
                placeholder="Expiration Month"
                value={certificate.expirationMonth}
                onChange={(e) => handleInputChange(index, 'expirationMonth', e.target.value)}
                className="border p-3 h-12 w-full bg-gray-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block">Upload File:</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="mb-2"
              />
              {certificate.file && (
                <p className="text-sm text-gray-600">Current file: {certificate.file.name}</p>
              )}
            </div>
          </div>
        ))}

        {/* <div className="flex space-x-2">
          <Button type="button" color="black" onClick={addNewCertificate} className="mt-2 ml-auto font-thin text-[14px] normal-case">
            Add Certificate
          </Button>
        </div> */}

        <div>
          <Button color="black" type="submit" className="mt-2 w-full text-[16px] font-thin">
            Save Certificates
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCertificateForm;
