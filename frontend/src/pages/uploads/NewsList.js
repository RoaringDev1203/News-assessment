import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadsNavbar from "./UploadsNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NewsList() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  useEffect(() => {
    const fetchNews = async (page) => {
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
        } else {
          // Append newNews to existing newsList for subsequent pages
          setNewsList(prevNewsList => [...prevNewsList, ...newNews]);
        }
        setHasMore(response.data.next !== null);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setError("Error fetching news data");
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
        setNewsList(newsList?.filter(news => news.id !== newsToDelete.id));
        setDeleteModal(false);
      } catch (error) {
        console.error("Error deleting news item:", error);
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
        setNewsList(newsList?.map(news =>
          news.id === currentNews.id ? { ...news, title: newTitle, text: newText } : news
        ));
        setShowModal(false);
      } catch (error) {
        console.error("Error updating news item:", error);
      }
    }
  };

  if (error) {
    return (
      <div className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? "g-sidenav-pinned" : ""}`}>
        <div>{error}</div>
      </div>
    );
  }

  // Calculate statistics
  const totalNews = newsList.length;
  const totalLikes = newsList.reduce((total, newsItem) => total + newsItem.likes, 0);
  const totalDislikes = newsList.reduce((total, newsItem) => total + newsItem.dislikes, 0);

  return (
    <div className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? "g-sidenav-pinned" : ""}`}>
      <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <UploadsNavbar toggleHandle={toggleHandle} componentName={"News Editor"} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: "100%" }}>
            <div className='col-12'>
              <h5 style={{ padding: '1rem' }}>News List</h5>
              <div className='card mb-4'>
                <div className='card-body'>
                  <div className="mb-4">
                    <h6 style={{fontWeight:"bold"}}>News Statistics</h6>
                    <p style={{fontWeight:"bold"}}>Total News being Viewed: {totalNews}</p>
                    <p style={{fontWeight:"bold"}}>Total Likes: {totalLikes}</p>
                    <p style={{fontWeight:"bold"}}>Total Dislikes: {totalDislikes}</p>
                  </div>
                  {newsList.length > 0 ? (
                    newsList.map((newsItem, index) => (
                      <div key={newsItem.id} className='mb-4'>
                        <h5>{newsItem.title}</h5>
                        <p>{newsItem.text}</p>
                        <div className="mt-2 mb-2">
                          <strong className="m-2">Tags</strong>
                          {newsItem.tags_info.map((tag, tagIndex) => (
                            <span key={tagIndex} className='badge bg-secondary me-2'>{tag.name}</span>
                          ))}
                        </div>
                        <div>
                          {newsItem.picture_urls && newsItem.picture_urls.map((url, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={url}
                              alt={`news-${index}-img-${imgIndex}`}
                              style={{ width: "100px", height: "100px", margin: "10px" }}
                            />
                          ))}
                        </div>
                        <div>
                          <strong>Likes:</strong> {newsItem.likes} &nbsp;|&nbsp;
                          <strong>Dislikes:</strong> {newsItem.dislikes}
                        </div>
                        <div className="mt-2">
                          <Button variant="btn bg-gradient-primary" onClick={() => handleEdit(newsItem)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(newsItem)} className="ms-2">Delete</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No news available</div>
                  )}
                  {loading && <div>Loading more news...</div>}
                  {error && <div>{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      {currentNews && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit News</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="btn bg-gradient-primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
  
      {newsToDelete && (
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the news item "{newsToDelete.title}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
  
}

export default NewsList;
