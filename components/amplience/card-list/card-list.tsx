import React from 'react';

import Card, { CardProps } from '../card/card';

interface CardListProps {
  header?: string;
  cards?: CardProps[];
}

const CardList = ({ header, cards }: CardListProps) => {
  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      {Boolean(header) && <h2>{header}</h2>}
      {cards && (
        <div className="space-x-4 sm:flex">
          {cards.map((card, index: number) => {
            return (
              <Card
                cardName={card.cardName}
                description={card.description}
                image={card.image}
                key={index}
                links={card.links}
                style={{
                  width: `calc(100%/${cards.length})`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
