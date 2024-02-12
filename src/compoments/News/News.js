import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/News.css';

function News() {
  const [techNews, setTechNews] = useState([]);
  const [designNews, setDesignNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const techResponse = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=53568428707b46d7b49511bc725f95a8');
        const designResponse = await axios.get('https://newsapi.org/v2/everything?q=apple&from=2024-02-07&to=2024-02-07&sortBy=popularity&apiKey=53568428707b46d7b49511bc725f95a8');
        setTechNews(techResponse.data.articles.slice(0, 2)); // Assuming the API returns an array of articles
        setDesignNews(designResponse.data.articles.slice(0, 2)); // Assuming the API returns an array of articles
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <div className="spacer"></div> {/* Spacer for spacing between navbar and news */}
      <div className="container">
        <div className="news-grid">
          {techNews.map((news, index) => (
            <div key={index} className="news-card tech-news">
              <div className="news-image" style={{backgroundImage: `url(${news.urlToImage})`}}>
                <div className="news-overlay">
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="see-more">See More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="news-grid">
          {designNews.map((news, index) => (
            <div key={index} className="news-card design-news">
              <div className="news-image" style={{backgroundImage: `url(${news.urlToImage})`}}>
                <div className="news-overlay">
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="see-more">See More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
