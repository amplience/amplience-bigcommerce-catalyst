'use client';

import { ContentClient } from 'dc-delivery-sdk-js';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FilterByRequest, IOrder } from 'dc-delivery-sdk-js/build/main/lib/content/model/FilterBy';
import { createAmplienceClient } from '~/amplience-client';

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
      setHydratedBlogs(blogs);
    };
    void fetchData();
  }, [sortOrder, sortValue]);

  return (
    <div>
      <p>SORT ORDER: {sortOrder}</p>
      <p>SORT VALUE: {sortValue}</p>
      <select name="sortValue" onChange={handleSortValueChange}>
        <option value="default">Default</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
      <select name="sortOrder" onChange={handleSortOrderChange}>
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </select>
      <div className="mb-8">{JSON.stringify(hydratedBlogs, null, 2)}</div>
    </div>
  );
};

export default BlogList;
