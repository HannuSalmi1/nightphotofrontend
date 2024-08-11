// PhotoPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/nav/NavbarMain';

const PhotoPage: React.FC = () => {
  const location = useLocation();
  
  const imageUrl = location.state?.url;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    


    console.log("Comment submitted");
   // navigate(-1); // Navigate back to the previous page after submitting
  };

  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={imageUrl} alt="User Uploaded" style={{ maxWidth: '90%', maxHeight: '90vh', margin: '5px 0' }} />
        <form onSubmit={handleSubmit} style={{ width: '75%' }}> {/* Adjusted width to make the comment box slightly thinner than the photo */}
          <textarea placeholder="Write a comment..." required style={{ width: '100%', margin: '10px 0' }}></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PhotoPage;