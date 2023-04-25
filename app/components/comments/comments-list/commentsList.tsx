import { CommentListItem } from '../..';
import type { Comment } from '~/types';

type CommentsListProps = {
  comments: Comment[];
};

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <ul>
      {comments.map((comment: Comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
