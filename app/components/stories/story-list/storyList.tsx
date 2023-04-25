import { Link } from '@remix-run/react';
import { StoryListItem } from '../../';
import type { Story } from '~/types';

type StoryListProps = {
  stories: Story[];
};

export function StoryList({ stories }: StoryListProps) {
  return (
    <ul>
      {stories.map((story) => (
        <Link to={String(story.id)} key={story.id}>
          <StoryListItem
            title={story.title}
            rating={story.score}
            author={story.by}
            date={story.time}
            descendants={story.descendants}
            id={story.id}
          />
        </Link>
      ))}
    </ul>
  );
}
