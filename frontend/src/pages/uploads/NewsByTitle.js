import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import UploadsNavbar from './UploadsNavbar';
import NewsItem from './NewsItem';

const NewsByTitle = () => {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNewsList, setFilteredNewsList] = useState([]);

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  useEffect(() => {
    const fetchNews = async (page) => {
      console.log(page);
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/news/?page=${page}`);
        const newNews = response.data['results'];
        if (newNews.length === 0) {
          setHasMore(false); // No more data available
          return;
        }
        if (page === 1) {
          // Set newsList to newNews if it's the first page
          setNewsList(newNews);
          // Sort the news list alphabetically before setting it to filteredNewsList
          const sortedNews = newNews.slice().sort((a, b) => a.title.localeCompare(b.title));
          setFilteredNewsList(sortedNews);
        } else {
          // Append newNews to existing newsList for subsequent pages
          setNewsList(prevNewsList => [...prevNewsList, ...newNews]);
          setFilteredNewsList(prevFilteredList => [...prevFilteredList, ...newNews]);
        }
        setHasMore(response.data.next !== null);
      } catch (error) {
        console.error('Error fetching news data:', error);
        setError('Error fetching news data');
      } finally {
        setLoading(false);
      }
    };
    fetchNews(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !loading &&
        hasMore
      ) {
        setPage(prevPage => prevPage + 1); // Increment page by 1
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 200); // Debounce scroll event

    if (!loading && hasMore) {
      window.addEventListener('scroll', debouncedHandleScroll);
    } else {
      window.removeEventListener('scroll', debouncedHandleScroll);
    }

    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [loading, hasMore]);

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  };

  const handleEdit = (newsItem) => {
    setCurrentNews(newsItem);
    setNewTitle(newsItem.title);
    setNewText(newsItem.text);
    setShowModal(true);
  };

  const handleDelete = (newsItem) => {
    setNewsToDelete(newsItem);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (newsToDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/v1/news/${newsToDelete.id}/`);
        setNewsList(newsList.filter(news => news.id !== newsToDelete.id));
        setFilteredNewsList(filteredNewsList.filter(news => news.id !== newsToDelete.id));
        setDeleteModal(false);
      } catch (error) {
        console.error('Error deleting news item:', error);
      }
    }
  };

  const handleSave = async () => {
    if (currentNews) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/v1/news/${currentNews.id}/`, {
          title: newTitle,
          text: newText
        });
        setNewsList(newsList.map(news =>
          news.id === currentNews.id ? { ...news, title: newTitle, text: newText } : news
        ));
        setFilteredNewsList(filteredNewsList.map(news =>
          news.id === currentNews.id ? { ...news, title: newTitle, text: newText } : news
        ));
        setShowModal(false);
      } catch (error) {
        console.error('Error updating news item:', error);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() === '') {
      // If the search query is empty, reset the filtered news list to the entire news list
      setFilteredNewsList(newsList);
    } else {
      // Filter the news list based on the search query
      const filtered = newsList.filter(news =>
        news.title.toLowerCase().includes(query)
      );
      // Sort the filtered list alphabetically
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      setFilteredNewsList(filtered);
    }
  };
  
  
  
  if (error) {
    return (
      <div className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? 'g-sidenav-pinned' : ''}`}>
        <div>{error}</div>
      </div>
    );
  }
  return (
    <div className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? 'g-sidenav-pinned' : ''}`}>
      <Sidebar allnews={'allnews'} dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <UploadsNavbar toggleHandle={toggleHandle} componentName={'News By Title'} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: '100%' }}>
            <div className='col-12'>
              <h5 style={{ padding: '1rem' }}>News List</h5>
              <div className='card mb-4'>
                <div className='card-header'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search by title...'
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className='card-body'>
                  {filteredNewsList.length > 0 ? (
                    filteredNewsList.map((newsItem,index) => (
                      <NewsItem key={index} newsItem={newsItem} updateNewsList={(id, likes, dislikes) => {
                        // Update likes and dislikes for the specific news item
                        setFilteredNewsList(prevList =>
                          prevList.map(item => item.id === id ? { ...item, likes, dislikes } : item)
                        );
                      }} />
                    ))
                  ) : (
                    searchQuery.trim() !== '' ? (
                      <div>No results found</div>
                    ) : null
                  )}
                  {loading && <div>Loading more news...</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsByTitle;
