import React from 'react';
import PropTypes from 'prop-types';
import objstr from 'obj-str';
import { Menu, MenuList, MenuButton, MenuItem } from '@simonlc/menu-button';
import './styles.css';

const Dropdown = ({ id, items, onChange, currentItem }) => (
  <Menu>
    <MenuButton className="button">{currentItem}</MenuButton>
    <MenuList className="dropdown">
      {items?.map(item => (
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

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  currentItem: PropTypes.string,
};

export default Dropdown;
