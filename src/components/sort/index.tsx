import React from 'react';
import './styles.css';

type SortProps = { children: React.ReactNode };
export default function Sort({ children }: SortProps) {
  return (
    <div className="sort">
      <div className="sort__title">Sort</div>
      {children}
    </div>
  );
}
