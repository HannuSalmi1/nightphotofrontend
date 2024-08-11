import React, { useContext, useState } from 'react';
import AuthContext from '../AuthContext';
import NavbarMain from './nav/NavbarMain';

const UploadForm: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);

    
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://nphotoapi-ascra0avhfaedzfh.northeurope-01.azurewebsites.net/api/Users/UploadImage', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies if needed
 
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <NavbarMain />
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input style={{ color: 'white' }} type="file" onChange={handleFileChange} />
          <button style={{ color: 'white' }} type="submit">Upload</button>
        </form>
      ) : (
        <p style={{ color: 'white' }}>Please log in to upload an image.</p>
      )}
    </>
  );
};

export default UploadForm;