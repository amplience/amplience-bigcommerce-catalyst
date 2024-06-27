/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ContentClient, DefaultContentBody } from 'dc-delivery-sdk-js';
import { FilterByRequest, IOrder } from 'dc-delivery-sdk-js/build/main/lib/content/model/FilterBy';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';

import { AmplienceImage } from '../image/image.types';

import BlogCard from './blog-card';

export type SortByValue = 'default' | 'title' | 'author';

export interface BlogListProps {
  hubName: string;
  locale?: string;
  stagingEnvironment?: string;
}

export interface Blog extends DefaultContentBody {
  snippet: {
    title: string;
    author: string;
    blogdate: string;
    description: string;
    image: { image: AmplienceImage };
  };
}

async function fetchBlogs(
  options: { key?: SortByValue; order?: IOrder },
  amplienceClient: ContentClient,
): Promise<Blog[]> {
  const { key = 'default', order = 'DESC' } = options;
  const fetchPage = async (nextCursor?: string): Promise<any> => {
    const filterRequest: FilterByRequest = {
      filterBy: [
        {
          path: '/_meta/schema',
          value: 'https://demostore.amplience.com/content/blog',
        },
        {
          path: '/active',
          value: true,
        },
      ],
      sortBy: {
        key,
        order,
      },
      page: {
        size: 12,
        cursor: nextCursor,
      },
    };
    const results = await amplienceClient.filterContentItems(filterRequest);
    const responses = results.responses || [];

    if (results.page.nextCursor) {
      return [...responses, ...(await fetchPage(results.page.nextCursor))];
    }

    return responses.map((r) => r.content);
  };

  return fetchPage();
}

const BlogList = ({ hubName, locale, stagingEnvironment }: BlogListProps) => {
  const [hydratedBlogs, setHydratedBlogs] = useState<Blog[]>([]);
  const [sortOrder, setSortOrder] = useState<IOrder>('DESC');
  const [sortValue, setSortValue] = useState<SortByValue>('default');

  const amplienceClient = createAmplienceClient(
    clientOptionsMapper({ hubName, locale, stagingEnvironment }),
  );

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await fetchBlogs({ order: sortOrder, key: sortValue }, amplienceClient);

      setHydratedBlogs(blogs);
    };

    void fetchData();
  }, [sortOrder, sortValue]);

  const handleSortValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value as SortByValue);
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as IOrder);
  };

  return (
    <div>
      Sort By:{' '}
      <select className="mr-4" name="sortValue" onChange={handleSortValueChange}>
        <option value="default">Date</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
      Order By:{' '}
      <select name="sortOrder" onChange={handleSortOrderChange}>
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </select>
      <div
        style={{
          display: 'grid',
          gridGap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(355px, 1fr))',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        {hydratedBlogs
          ? hydratedBlogs.map((blog, index) => {
              return (
                <div key={index}>
                  <BlogCard
                    author={blog.snippet.author}
                    blogdate={blog.snippet.blogdate}
                    deliveryKey={blog._meta.deliveryKey || ''}
                    description={blog.snippet.description}
                    image={blog.snippet.image.image}
                    title={blog.snippet.title}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default BlogList;
