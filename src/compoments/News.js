import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=nl&category=technology&apiKey=53568428707b46d7b49511bc725f95a8')
      .then(response => {
        setNews(response.data.articles.slice(0, 3));
      })
      .catch(error => {
        console.error('Fout bij het ophalen van nieuws:', error);
      });
  }, []);

  return (
    <div>
      <h2>Technologie Nieuws</h2>
      {news && (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <img src={article.urlToImage} alt="Thumbnail" />
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;
