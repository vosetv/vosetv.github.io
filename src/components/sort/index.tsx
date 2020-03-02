import React from 'react';
import Dropdown from '../dropdown';
import styles from './styles.css';

export default function Sort({ filters, setFilter }) {
  return (
    filters?.length > 0 && (
      <div className={styles.container}>
        <div className={styles.title}>Sort</div>
        {filters.map(([filter, onChange]) => (
          <Dropdown key={filter.id} onChange={onChange} {...filter} />
        ))}
      </div>
    )
  );
}
