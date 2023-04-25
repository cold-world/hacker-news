import { json } from '@remix-run/node';
import { Link, useRouteError, isRouteErrorResponse, useLoaderData } from '@remix-run/react';
import { getStory, getComments } from '../news.server';
import { CommentsList } from '../components';
import type { LoaderFunction } from '@remix-run/node';
import type { Story, Comment } from '~/types';
import type { V2_MetaFunction } from '@remix-run/node';
import { links as commentListItemLinks } from '../components/comments/comment-list-item/commentListItem';
import { links as childCommentListItemLinks } from '../components/comments/child-comment-list-item/childCommentListItem';

import styles from '../styles/slug.css';
import { timestampToDate } from '~/utils/convertTimestamp';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Hacker News' }];
};

type LoaderData = {
  story: Story;
  comments: Comment[];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Response('Not Found', { status: 404 });
  }

  const story = await getStory(params.slug);
  const commentIds = story.kids || [];
  const comments = await getComments(commentIds);

  return json({
    story,
    comments,
  });
};

export default function StorySlug() {
  const { story, comments } = useLoaderData<LoaderData>();
  const convertedDate = timestampToDate(story.time);

  return (
    <main className='slug'>
      <div className='slug__author'>
        <span>Posted by: {story.by}</span>
        <span>{convertedDate} minutes ago</span>
      </div>
      <h1 className='slug__title'>{story.title}</h1>
      <a href={story.url}>{story.url}</a>
      <div className='slug__comments'>
        <span>{story.descendants} comments</span>
      </div>
      <section>
        <CommentsList comments={comments} />
      </section>
    </main>
  );
}

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    ...commentListItemLinks(),
    ...childCommentListItemLinks(),
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = 'Unknown error';
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
      <Link to='/'>Back</Link>
    </div>
  );
}
