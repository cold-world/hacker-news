import { useRevalidator, useLocation } from '@remix-run/react';
import { Button } from '~/components';

import styles from './header.css';

export function Header() {
  const location = useLocation();

  const revalidator = useRevalidator();

  const handleRevalidate = () => {
    revalidator.revalidate();
  };

  return (
    <header className='header'>
      <p className='header__logo'>Hacker News</p>
      <div>
        {location.pathname !== '/' && <Button title='Go Back' type='link' />}
        <Button title='Refresh Data' type='button' revalidate={handleRevalidate} />
      </div>
    </header>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
