import type { ChildComment } from '~/types';
import { convertComment } from '~/utils/htmlConvert';

import styles from './childCommentListItem.css';


type ChildCommentListItemProps = {
  comment: ChildComment;
};

export function ChildCommentListItem({ comment }: ChildCommentListItemProps) {
  const convertedComment = convertComment(comment.text);

  return <p className='child-comment'>{convertedComment}</p>;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
