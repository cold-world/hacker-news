import { useEffect } from 'react';
import { useLoaderData, useRevalidator } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getNewStories } from '../news.server';
import { REVALIDATE_TIME } from '~/config';
import { sortByDateDescending } from '~/utils/sortByData';
import { StoryList } from '~/components';
import type { V2_MetaFunction } from '@remix-run/node';
import { links as storyListItemLinks } from '../components/stories/story-list-item/storyListItem';

import styles from '../styles/home.css';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Hacker News' }];
};

type LoaderData = {
  data: Awaited<ReturnType<typeof getNewStories>>;
};

export const loader = async () => {
  return json<LoaderData>({
    data: await getNewStories(),
  });
};

export default function Index() {
  const revalidator = useRevalidator();

  const handleRevalidate = () => {
    revalidator.revalidate();
  };

  const { data } = useLoaderData() as LoaderData;

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRevalidate();
    }, REVALIDATE_TIME);

    return () => clearInterval(intervalId);
  }, []);

  const sortedData = sortByDateDescending(data || []);

  if (sortedData.length < 1) {
    return <p>Something went wrong... No data...</p>;
  }

  return (
    <main className='home'>
      <StoryList stories={sortedData} />
    </main>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }, ...storyListItemLinks()];
}
