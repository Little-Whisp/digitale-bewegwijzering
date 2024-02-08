import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pubs = () => {
  const [nearbyPubs, setNearbyPubs] = useState(null);

  useEffect(() => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.5872,4.7741&radius=500&type=bar&key=YOUR_GOOGLE_PLACES_API_KEY`)
      .then(response => {
        setNearbyPubs(response.data.results.slice(0, 5));
      })
      .catch(error => {
        console.error('Fout bij het ophalen van kroegen:', error);
      });
  }, []);

  return (
    <div>
      <h2>Kroegen in de buurt van Adriaan van Bergenstraat 206, Breda</h2>
      {nearbyPubs && (
        <ul>
          {nearbyPubs.map((pub, index) => (
            <li key={index}>
              <p>{pub.name}</p>
              <p>Openingstijden: {pub.opening_hours ? pub.opening_hours.weekday_text[4] : 'Onbekend'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pubs;
