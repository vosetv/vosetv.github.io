import React from 'react';
import objstr from 'obj-str';
import { Menu, MenuList, MenuButton, MenuItem } from '@simonlc/menu-button';
import { TimeRangeTuple, SortTuple } from '../video-provider';
import styles from './styles.css';

type DropdownProps = {
  id: string;
  items: TimeRangeTuple | SortTuple | string[];
  onChange: (action: { [key: string]: string }) => void;
  currentItem: string;
};

export default function Dropdown({
  id,
  items,
  onChange,
  currentItem,
}: DropdownProps) {
  return (
    <Menu>
      <MenuButton className={styles.button}>{currentItem}</MenuButton>
      <MenuList className={styles.dropdown}>
        {(items as string[])?.map((item: string) => (
          <MenuItem
            key={item}
            className={objstr({
              [styles.current]: item === currentItem,
            })}
            onSelect={() => onChange({ [id]: item })}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
