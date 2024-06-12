/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React from 'react';

import Card from '../card/card';

interface CardListProps {
  header?: string;
  cards?: DefaultContentBody[];
}

const CardList = ({ header, cards }: CardListProps) => {
  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      {Boolean(header) && <h2>{header}</h2>}
      {cards && (
        <div className="space-x-4 sm:flex">
          {cards.map((card: any, index: number) => {
            return (
              <Card
                key={index}
                style={{
                  width: `calc(100%/${cards.length})`,
                }}
                image={card.image}
                cardName={card.cardName}
                description={card.description}
                links={card.links}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
