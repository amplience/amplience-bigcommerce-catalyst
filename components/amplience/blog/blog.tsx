import React from 'react';
import { AmplienceContentItem } from '~/amplience-client';
import AmplienceContent from '../wrapper/amplience-content';

export interface BlogProps {
  snippet: AmplienceContentItem;
  contentTypes?: AmplienceContentItem[];
  content: AmplienceContentItem;
}

const Blog = ({ snippet, content, contentTypes = [] }: BlogProps) => {
  const Blog = (
    <div>
      <div>
        <AmplienceContent content={snippet} />
      </div>
      <div
        style={{
          maxWidth: '100%',
          margin: 'auto',
        }}
      >
        <AmplienceContent content={content} />
        {contentTypes.map((item: any, index: number) => (
          <div key={index}>
            <AmplienceContent content={item} />
          </div>
        ))}
      </div>
    </div>
  );

  return Blog;
};

export default Blog;
