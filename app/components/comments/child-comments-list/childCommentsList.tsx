import { ChildCommentListItem } from '../../';
import type { ChildComment } from '~/types';

type ChildCommentsListProps = {
  comments: ChildComment[];
};

export function ChildCommentsList({ comments }: ChildCommentsListProps) {
  return (
    <ul>
      {comments.map((comment) => (
        <ChildCommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}