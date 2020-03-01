import React from 'react';
import Logo from '../logo';
import Link from '../Link';
import styles from './styles.css';

export default function Header({ children }) {
  return (
    <header className={styles.header}>
      <Link to="videos">
        <Logo className={styles.logo} />
      </Link>
      {children}
    </header>
  );
}
