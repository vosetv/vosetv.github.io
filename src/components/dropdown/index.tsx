import React from 'react';
import objstr from 'obj-str';
import { Menu, MenuList, MenuButton, MenuItem } from '@simonlc/menu-button';
// import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import { TimeRangeTuple, SortTuple } from '../video-provider';
import styles from './styles.css';

type DropdownProps = {
  id: string;
  items: string[];
  onChange: (action: { [key: string]: string }) => void;
  current: string;
};

export default function Dropdown({
  id,
  items,
  onChange,
  current,
}: DropdownProps) {
  return (
    <Menu>
      <MenuButton className={styles.button}>{current}</MenuButton>
      <MenuList className={styles.dropdown}>
        {items.map(item => (
          <MenuItem
            key={item}
            className={objstr({
              [styles.current]: item === current,
            })}
            onSelect={() => onChange(item)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
