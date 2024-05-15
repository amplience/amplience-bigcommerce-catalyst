import React from 'react';
import { AmplienceContentItem } from '~/amplience-client';
import Card from '../card/card';

interface CardListProps {
  header?: string;
  cards?: AmplienceContentItem[];
}

const CardList = ({ header, cards }: CardListProps) => {
  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      {header && <h2>{header}</h2>}
      {cards && (
        <div className="space-x-4 sm:flex">
          {cards.map((card: any) => {
            return <Card key={Math.random().toString(36).substr(2, 9)} {...card} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
