import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function NewsItem({ newsItem, updateNewsList }) {
  const [userAction, setUserAction] = useState(null);

  useEffect(() => {
    const storedAction = localStorage.getItem(`news-${newsItem.id}`);
    if (storedAction) {
      setUserAction(storedAction);
    }

    const ws = new WebSocket(`ws://127.0.0.1:8001/ws/news/${newsItem.id}/`);
    console.log(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message.id === newsItem.id) {
        updateNewsList(newsItem.id, data.message.likes, data.message.dislikes);
      }
    };

    // return () => {
    //   ws.close();
    // };
  }, [newsItem.id, updateNewsList]);

  const handleLike = async () => {
    if (userAction === "liked") {
      await handleUndoLike();
    } else {
      try {
        if (userAction === "disliked") {
          await axios.patch(`http://127.0.0.1:8000/api/v1/news/${newsItem.id}/`, {
            likes: newsItem.likes + 1,
            dislikes: newsItem.dislikes - 1,
          });
          updateNewsList(newsItem.id, newsItem.likes + 1, newsItem.dislikes - 1);
        } else {
          await axios.patch(`http://127.0.0.1:8000/api/v1/news/${newsItem.id}/`, {
            likes: newsItem.likes + 1,
          });
          updateNewsList(newsItem.id, newsItem.likes + 1, newsItem.dislikes);
        }
        localStorage.setItem(`news-${newsItem.id}`, "liked");
        setUserAction("liked");
      } catch (error) {
        console.error("Error liking news item:", error);
      }
    }
  };

  const handleUndoLike = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/v1/news/${newsItem.id}/`, {
        likes: newsItem.likes - 1,
      });
      updateNewsList(newsItem.id, newsItem.likes - 1, newsItem.dislikes);
      localStorage.removeItem(`news-${newsItem.id}`);
      setUserAction(null);
    } catch (error) {
      console.error("Error undoing like:", error);
    }
  };

  const handleDislike = async () => {
    if (userAction === "disliked") {
      await handleUndoDislike();
    } else {
      try {
        if (userAction === "liked") {
          await axios.patch(`http://127.0.0.1:8000/api/v1/news/${newsItem.id}/`, {
            likes: newsItem.likes - 1,
            dislikes: newsItem.dislikes + 1,
          });
          updateNewsList(newsItem.id, newsItem.likes - 1, newsItem.dislikes + 1);
        } else {
          await axios.patch(`http://127.0.0.1:8000/api/v1/news/${newsItem.id}/`, {
            dislikes: newsItem.dislikes + 1,
          });
          updateNewsList(newsItem.id, newsItem.likes, newsItem.dislikes + 1);
        }
        localStorage.setItem(`news-${newsItem.id}`, "disliked");
        setUserAction("disliked");
      } catch (error) {
        console.error("Error disliking news item:", error);
      }
    }
  };

  const handleUndoDislike = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/v1/news/${newsItem.id}/`, {
        dislikes: newsItem.dislikes - 1,
      });
      updateNewsList(newsItem.id, newsItem.likes, newsItem.dislikes - 1);
      localStorage.removeItem(`news-${newsItem.id}`);
      setUserAction(null);
    } catch (error) {
      console.error("Error undoing dislike:", error);
    }
  };

  return (
    <div className='card mb-4'>
      <div className='card-body'>
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
              alt={`news-${newsItem.id}-img-${imgIndex}`}
              style={{ width: "100px", height: "100px", margin: "10px" }}
            />
          ))}
        </div>
        <div>
          <strong>Likes:</strong> {newsItem.likes} &nbsp;|&nbsp;
          <strong>Dislikes:</strong> {newsItem.dislikes}
        </div>
        <div className="mt-2">
          <Button variant="success" onClick={handleLike} disabled={userAction === "liked"}>Like</Button>
          <Button variant="danger" onClick={handleDislike} className="ms-2" disabled={userAction === "disliked"}>Dislike</Button>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
