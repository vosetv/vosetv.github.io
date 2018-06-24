import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import objstr from 'obj-str';
import Modal from './modal';
import DropdownContainer from './dropdown-container';

const Dropdown = ({ id, items, activeItem, toggle, onChange }) => (
  <Subscribe to={[DropdownContainer]}>
    {container => (
      <>
        <button
          className="button sort__button"
          onClick={() => container.toggle(id)}
        >
          {activeItem}
        </button>
        <Modal>
          {container.state.active === id && (
            <div className="dropdown">
              <ul className="list-bare">
                {items.map((item, i) => (
                  <li
                    className={objstr({
                      dropdown__active: item === activeItem,
                    })}
                    onClick={() => {
                      container.toggle(id);
                      onChange(item);
                    }}
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal>
      </>
    )}
  </Subscribe>
);

Dropdown.propTypes = {
  id: PropTypes.any.isRequired,
};

export default Dropdown;
