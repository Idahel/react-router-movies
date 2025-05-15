import React from "react";
import { Link } from "react-router-dom";

export const CollectionCard = ({ collection }) => {
  return (
    <Link to={`/collections/${collection.id}`} className="collection-card-link">
      <div className="collection-card">
        {collection.image && (
          <img
            src={collection.image}
            alt={collection.title}
            className="collection-card-image"
          />
        )}
        <h3 className="collection-card-title">{collection.title}</h3>
        <p className="collection-card-description">{collection.description}</p>
        View Collection →
      </div>
    </Link>
  );
};
