import React from "react";

export const MovieSkeleton = () => {
  return (
    <div className="movie-card skeleton">
      <div className="movie-image-container">
        <div className="movie-image skeleton-box image" />
      </div>
      <div className="movie-content">
        <div className="skeleton-box title" />
        <div className="skeleton-box director" />
      </div>
    </div>
  );
};
