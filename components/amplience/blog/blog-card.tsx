import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React from 'react';
import AmplienceContent from '../wrapper/amplience-content';

export interface BlogCardProps {
  snippet: DefaultContentBody;
}

const BlogCard = ({ snippet }: BlogCardProps) => {
  const blog = (
    <div>
      <div className="mb-8">
        <AmplienceContent content={snippet} />
      </div>
    </div>
  );

  return blog;
};

export default BlogCard;
