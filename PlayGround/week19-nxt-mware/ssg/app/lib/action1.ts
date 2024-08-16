'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidate(param: string) {
  console.log('custom', param);
  revalidateTag('todos');
}
