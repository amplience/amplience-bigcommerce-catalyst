import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React from 'react';
import { Link } from '~/components/link';
import Image from '~/components/amplience/image/image';

export interface BlogCardProps {
  content: DefaultContentBody;
}

const BlogCard = ({ content }: BlogCardProps) => {
  return (
    <>
      <Link href={`/blog/${content._meta.deliveryKey}`}>
        {content && (
          <Image
            image={content.snippet.image.image}
            query="w=500&sm=aspect&aspect=16:9"
            _meta={content.snippet.image.image._meta}
          />
        )}
        {content.snippet.title ? (
          <h1 className="mb-4 mt-4 truncate text-xl font-black lg:text-2xl">
            {content.snippet.title}
          </h1>
        ) : null}
        <div>
          {content.snippet.author ? (
            <h4 className="mb-2 text-gray-500">{content.snippet.author}</h4>
          ) : null}
          {content.snippet.blogdate ? (
            <h4 className="mb-2 text-gray-500">{content.snippet.blogdate}</h4>
          ) : null}
        </div>
        {content.snippet.description ? (
          <p className="mb-4 truncate">{content.snippet.description}</p>
        ) : null}
      </Link>
    </>
  );
};

export default BlogCard;
