import React from 'react';
import './styles/Pubs.css';

const Pubs = () => {
  const nearbyPubs = [
    {
      name: "Dok 19",
      opening_hours: ["Vrijdag: 10:00 uur - 02:00 uur"]
    },
    {
      name: "Mad Molly's Irish Pub",
      opening_hours: ["Vrijdag: 15:00 uur - 02:00 uur"]
    },
    {
      name: "Irish pub & kitchen Ned Kelly's",
      opening_hours: ["Vrijdag: 15:00 uur - 02:00 uur"]
    },
    {
      name: "Shots",
      opening_hours: ["Vrijdag: 21:00 uur - 04:00 uur"]
    },
    {
      name: "Café Bruxelles",
      opening_hours: ["Vrijdag: 12:00 uur - 04:00 uur"]
    }
  ];

  return (
    <div>
      <div className="blue-section">
        <h2>Na een lange dag verdien je wel een biertje </h2>
      <div className="pubs-container">
        <ul>
          {nearbyPubs.map((pub, index) => (
            <li key={index}>
              <h4>{pub.name}</h4>
              <p>{pub.opening_hours.slice(0, 5).join(', ')}</p>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Pubs;
