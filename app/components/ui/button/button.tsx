import { Link } from '@remix-run/react';
import styles from './button.css';

type ButtonProps = {
  title: string;
  type: 'button' | 'link';
  revalidate?: () => void;
};

export function Button({ title, type, revalidate }: ButtonProps) {
  if (type === 'button') {
    return <button onClick={revalidate} className='button'>{title}</button>;
  } else {
    return (
      <Link to='/' className='button button-link'>
        {title}
      </Link>
    );
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
