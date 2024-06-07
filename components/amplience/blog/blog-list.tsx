'use client';

import { ContentClient } from 'dc-delivery-sdk-js';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FilterByRequest, IOrder } from 'dc-delivery-sdk-js/build/main/lib/content/model/FilterBy';
import { createAmplienceClient } from '~/amplience-client';
import BlogCard from './blog-card';

export type SortByValue = 'default' | 'title' | 'author';

export interface BlogProps {
  amplienceClientOptions: any;
}

async function fetchBlogs(
  options: { key?: SortByValue; order?: IOrder },
  amplienceClient: ContentClient,
) {
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
    const responses = results?.responses || [];

    if (results?.page.nextCursor) {
      return [...responses, ...(await fetchPage(results?.page.nextCursor))];
    }
    return responses;
  };

  return fetchPage();
}

const BlogList = ({ amplienceClientOptions }: BlogProps) => {
  const amplienceClient = createAmplienceClient(amplienceClientOptions);

  const [hydratedBlogs, setHydratedBlogs] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<IOrder>('DESC');
  const [sortValue, setSortValue] = useState<SortByValue>('default');

  const handleSortValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortValue(e.target.value as SortByValue);
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortOrder(e.target.value as IOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await fetchBlogs({ order: sortOrder, key: sortValue }, amplienceClient);
      console.log(blogs);
      setHydratedBlogs(blogs);
    };
    void fetchData();
  }, [sortOrder, sortValue]);

  return (
    <div>
      Sort By:{' '}
      <select className="mr-4" name="sortValue" onChange={handleSortValueChange}>
        <option value="default">Default</option>
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
                  <BlogCard {...blog} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default BlogList;
