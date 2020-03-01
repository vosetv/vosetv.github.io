import React from 'react';
import styles from './styles.css';

type SortProps = { children: Dropdown[] };
export default function Sort({ children }: SortProps) {
  return (
    children?.filter(Boolean).length > 0 && (
      <div className={styles.container}>
        <div className={styles.title}>Sort</div>
        {children}
      </div>
    )
  );
}
