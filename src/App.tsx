import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import NavbarMain from './components/nav/NavbarMain';
import Card from './components/Card';
import './App.css';

function App() {
  const [comment, setComment] = useState('');

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
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <NavbarMain />
      <Card />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
}

export default App;
