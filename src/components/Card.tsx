import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ImageData = {
  [key: string]: string;
};

const Card: React.FC = () => {
  const [urlArray, setUrlArray] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://localhost:5000/api/Users/getImages")
        .then(response => response.json())
        .then(data => {
          const imageUrls = Object.values(data as ImageData);
          setUrlArray(imageUrls);
        })
        .catch(error => console.error(error));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (url: string) => {
    navigate('/PhotoPage', { state: { url: 'https://localhost:5000' + url.substring(7) } });
  };

  if (urlArray.length === 0) {
    return <div style={{ color: 'white' }}>waiting for data...</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridAutoRows: '15fr', gridGap: '10px', width: '100%' }}>
      {urlArray.map((url, index) => (
        <div key={index}
             className="max-w-sm rounded overflow-hidden shadow-lg"
             style={{ transition: 'transform .2s', cursor: 'pointer' }}
             onMouseOver={event => (event.currentTarget.style.transform = 'scale(1.05)')}
             onMouseOut={event => (event.currentTarget.style.transform = 'scale(1)')}
             onClick={() => handleImageClick(url)}
        >
          <img className="w-full" src={'https://localhost:5000' + url.substring(7)} alt="Sunset in the mountains" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-amber-600">The Coldest Sunset</div>
            <p className="text-white text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
              et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;