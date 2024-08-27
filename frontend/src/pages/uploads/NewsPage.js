import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import UploadsNavbar from "./UploadsNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

function NewsPage() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/news/?page=${page}`);
        const newNews = response.data['results'];
        if (newNews.length === 0) {
          setHasMore(false); // No more data available
          return;
        }
        if (page === 1) {
          setNewsList(newNews);
        } else {
          setNewsList(prevNewsList => [...prevNewsList, ...newNews]);
        }
        setHasMore(response.data.next !== null);
      } catch (error) {
        setError("Error fetching news data");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const updateNewsList = (id, likes, dislikes) => {
    setNewsList(newsList.map(news => 
      news.id === id ? { ...news, likes: likes, dislikes: dislikes } : news
    ));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      !loading &&
      hasMore
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? "g-sidenav-pinned" : ""}`}>
      <Sidebar allnews={"allnews"} dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <UploadsNavbar toggleHandle={toggleHandle} componentName={"News"} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: "100%" }}>
            <div className='col-12'>
              <h5 style={{ padding: '1rem' }}>News List</h5>
              <div className='card mb-4'>
                <div className='card-body'>
                  {newsList && newsList.length > 0 ? (
                    newsList.map(newsItem => (
                      <NewsItem key={newsItem.id} newsItem={newsItem} updateNewsList={updateNewsList} />
                    ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewsPage;
