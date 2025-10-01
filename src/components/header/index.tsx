import React from 'react';
import Logo from '../logo';
import Link from '../link';
import styles from './styles.module.css';

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
