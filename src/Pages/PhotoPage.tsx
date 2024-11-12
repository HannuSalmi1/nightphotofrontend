// PhotoPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/nav/NavbarMain';

const PhotoPage: React.FC = () => {
  const location = useLocation();
  const [comment, setComment] = useState('');
  
  const imageUrl = location.state?.url;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with comment:", comment);

    try {
      const response = await fetch('https://localhost:8082/process-payload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: comment }),
      });

      if (response.ok) {
        console.log("Comment submitted successfully");
        // navigate(-1); // Uncomment if you want to navigate back after submitting
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={imageUrl} alt="User Uploaded" style={{ maxWidth: '90%', maxHeight: '90vh', margin: '5px 0' }} />
        <form onSubmit={handleSubmit} style={{ width: '75%' }}>
          <textarea 
            placeholder="Write a comment..." 
            required 
            style={{ width: '100%', margin: '10px 0' }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PhotoPage;