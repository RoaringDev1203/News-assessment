import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';
import Sidebar from '../../components/Sidebar/Sidebar';
import UploadsNavbar from './UploadsNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsByTags = () => {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
        const sortedNews = response.data['results'].sort((a, b) => a.tags_info[0].name.localeCompare(b.tags_info[0].name));
        if (page === 1) {
          setNewsList(sortedNews);
          setFilteredNewsList(sortedNews);
        } else {
          setNewsList(prevNewsList => [...prevNewsList, ...sortedNews]);
          setFilteredNewsList(prevFilteredList => [...prevFilteredList, ...sortedNews]);
        }
        setHasMore(response.data.next !== null);
      } catch (error) {
        setError('Error fetching news data');
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
    setFilteredNewsList(filteredNewsList.map(news =>
      news.id === id ? { ...news, likes: likes, dislikes: dislikes } : news
    ));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredNewsList(newsList);
    } else {
      const filtered = newsList.filter(news =>
        news.tags_info.some(tag => tag.name.toLowerCase().includes(query))
      );
      setFilteredNewsList(filtered);
    }
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
    const debouncedHandleScroll = debounce(handleScroll, 200);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [loading, hasMore]);

  const debounce = (func, delay) => {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? 'g-sidenav-pinned' : ''}`}>
      <Sidebar allnews={'allnews'} dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <UploadsNavbar toggleHandle={toggleHandle} componentName={'News By Tags'} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: '100%' }}>
            <div className='col-12'>
              <h5 style={{ padding: '1rem' }}>News List</h5>
              <div className='card mb-4'>
                <div className='card-header'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search by tag...'
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className='card-body'>
                  {filteredNewsList.map(newsItem => (
                    <NewsItem key={newsItem.id} newsItem={newsItem} updateNewsList={updateNewsList} />
                  ))}
                </div>
                {loading && <div>Loading more news...</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsByTags;
