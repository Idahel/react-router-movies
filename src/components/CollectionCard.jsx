import React from "react";
import { Link } from "react-router-dom";

export const CollectionCard = ({ collection }) => {
  return (
    <div className="collection-card">
      <h3 className="collection-card-title">{collection.title}</h3>
      <p className="collection-card-description">{collection.description}</p>
      <Link
        to={`/collections/${collection.id}`}
        className="collection-card-link"
      >
        View Collection →
      </Link>
    </div>
  );
};
