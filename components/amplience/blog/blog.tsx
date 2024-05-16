import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React from 'react';

import AmplienceContent from '../wrapper/amplience-content';

export interface BlogProps {
  snippet: DefaultContentBody;
  contentTypes?: DefaultContentBody[];
  content: DefaultContentBody;
}

const Blog = ({ snippet, content, contentTypes = [] }: BlogProps) => {
  const blog = (
    <div>
      <div className="mb-8">
        <AmplienceContent content={snippet} />
      </div>
      <div>
        <AmplienceContent content={content} />
        {contentTypes.map((item: DefaultContentBody, index: number) => (
          <div key={index}>
            <AmplienceContent content={item} />
          </div>
        ))}
      </div>
    </div>
  );

  return blog;
};

export default Blog;
