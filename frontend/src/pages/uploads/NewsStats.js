import React from "react";

function NewsStats({ newsList }) {
  const totalNews = newsList.length;
  const totalLikes = newsList.reduce((acc, newsItem) => acc + newsItem.likes, 0);
  const totalDislikes = newsList.reduce((acc, newsItem) => acc + newsItem.dislikes, 0);

  return (
    <div className='card mb-4'>
      <div className='card-body'>
        <h5 className='card-title'>News Stats</h5>
        <p className='card-text'><strong>Total News Items:</strong> {totalNews}</p>
        <p className='card-text'><strong>Total Likes:</strong> {totalLikes}</p>
        <p className='card-text'><strong>Total Dislikes:</strong> {totalDislikes}</p>
      </div>
    </div>
  );
}

export default NewsStats;
