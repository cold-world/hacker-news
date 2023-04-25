import type { Comment, ChildComment } from '~/types';
import { useState, useEffect } from 'react';
import { ChildCommentsList } from '~/components';
import { http } from '~/utils/http';
import { API_URL } from '~/config';
import { convertComment } from '~/utils/htmlConvert';

import styles from './commentListItem.css';

type CommentListItemProps = {
  comment: Comment;
};

export function CommentListItem({ comment }: CommentListItemProps) {
  const [childComments, setChildComments] = useState<ChildComment[]>([]);
  const [showChildren, setShowChildren] = useState<boolean>(false);

  useEffect(() => {
    async function fetchChildComments() {
      if ('kids' in comment && comment.kids) {
        try {
          const promises = comment.kids.map((id) => http(`${API_URL}/item/${id}.json`));
          const children = await Promise.all(promises);
          setChildComments(children);
        } catch (err) {
          console.log(err);
        }
      }
    }

    if (showChildren) {
      fetchChildComments();
    }
  }, [comment, showChildren]);

  function handleClick() {
    setShowChildren(!showChildren);
  }

  const convertedComment = convertComment(comment.text);

  return (
    <li className='comment-list-item'>
      <div>
        <p className='comment-list-item__text'>{convertedComment}</p>
        {'kids' in comment && comment.kids && (
          <button className='comment-list-item__button' onClick={handleClick}>
            {showChildren ? 'Hide' : 'Show'} {comment.kids.length} more
          </button>
        )}
      </div>
      {showChildren && <ChildCommentsList comments={childComments} />}
    </li>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
