import React from 'react';
import { Link } from 'react-router-dom';

export const CollectionCard = ({ collection }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '300px' }}>
      <h3>{collection.title}</h3>
      <p>{collection.description}</p>
      <Link to={`/collections/${collection.id}`}>View Collection</Link>
    </div>
  );
};