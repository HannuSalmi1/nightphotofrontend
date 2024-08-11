import React, { useState, useEffect } from 'react';

const FetchStringComponent: React.FC = () => {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('https://nphotoapi-ascra0avhfaedzfh.northeurope-01.azurewebsites.net/api/Users/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        setData(result);
      } catch (error) {
        console.error('There was an error fetching the string:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Fetched String: {data}</p>
    </div>
  );
};

export default FetchStringComponent;