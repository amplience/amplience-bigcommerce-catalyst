import React from 'react';

import Image from '~/components/amplience/image/image';
import { Link } from '~/components/link';

import { AmplienceImage } from '../image/image.types';

export interface BlogCardProps {
  deliveryKey: string;
  image: AmplienceImage;
  title: string;
  author: string;
  blogdate: string;
  description: string;
}

const BlogCard = ({ deliveryKey, image, title, author, blogdate, description }: BlogCardProps) => {
  return (
    <Link href={`/blog/${deliveryKey}`}>
      <Image image={image} query="w=500&sm=aspect&aspect=16:9" />

      {title ? (
        <h1 className="mb-4 mt-4 truncate text-xl font-black lg:text-2xl">{title}</h1>
      ) : null}
      <div>
        {author ? <h4 className="mb-2 text-gray-500">{author}</h4> : null}
        {blogdate ? <h4 className="mb-2 text-gray-500">{blogdate}</h4> : null}
      </div>
      {description ? <p className="mb-4 truncate">{description}</p> : null}
    </Link>
  );
};

export default BlogCard;
