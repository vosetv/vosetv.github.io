import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import { Menu, MenuList, MenuButton, MenuItem } from '@simonlc/menu-button';
import { TimeRangeTuple, SortTuple } from '../video-provider';
import './styles.css';

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
      <MenuButton className="button">{currentItem}</MenuButton>
      <MenuList className="dropdown">
        {(items as string[])?.map((item: string) => (
          <MenuItem
            key={item}
            className={objstr({
              dropdown__current: item === currentItem,
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

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  currentItem: PropTypes.string,
};
