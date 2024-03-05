import { NextRequest, NextResponse } from 'next/server';

import { getCategory } from '~/client/queries/get-category';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (id) {
    const categoryId = Number(id);
    const cat = await getCategory({
      categoryId,
    });
    const products = cat?.products.items;

    return NextResponse.json(products);
  }

  return new Response('Missing category id.', { status: 400 });
};

export const runtime = 'edge';
