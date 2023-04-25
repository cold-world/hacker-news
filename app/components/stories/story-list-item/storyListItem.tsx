import { timestampToDate } from '~/utils/convertTimestamp';
import styles from './storyListItem.css';

type StoryListItemProps = {
  title: string;
  rating: number;
  author: string;
  date: number;
  descendants: number;
  id: number;
};

export function StoryListItem({
  title,
  rating,
  author,
  descendants,
  date,
}: StoryListItemProps) {
  const convertedDate = timestampToDate(date);
  return (
    <li className='story-list-item'>
      <div className='story-list-item__author'>
        <span>Posted by: {author}</span>
        <span>{convertedDate} ago</span>
      </div>
      <p className='story-list-item__title'>{title}</p>
      <div className='story-list-comments'>
        <span>{descendants} comments</span>
        <span className='story-list-item__rating'>rating {rating}</span>
      </div>
    </li>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
