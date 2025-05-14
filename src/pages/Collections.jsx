import React from 'react';
import { CollectionCard } from '../components/CollectionCard';

export const Collections = () => {
  const curatedCollection = [
    {
      id: 'women-filmmakers',
      title: 'Women Filmmakers of Ukraine',
      description: 'Discover powerful and poignant films directed by talented women from Ukraine, showcasing their unique perspectives and storytelling.',
      genre_ids: [],
      personQuery: ''
    },
    {
      id: 'documentaries',
      title: 'Ukrainian Documentaries',
      description: 'Explore the rich tapestry of Ukrainian life, history, and culture through compelling and insightful documentary films.',
      genre_ids: [99],
    },

  ];

  return (
    <div>
      <h1>Collections</h1>
      <div>
        {curatedCollection.map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}