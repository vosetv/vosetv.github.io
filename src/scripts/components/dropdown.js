import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import objstr from 'obj-str';
import Modal from './modal';
import dropdownContainer from './dropdown-container';

class Dropdown extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
  };

  buttonRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOut);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOut);
  }

  handleClickOut = event => {
    if (['dropdown', 'button sort__button'].includes(event.target.className)) return;
    // TODO Test if DropdownContainer would work now
    dropdownContainer.toggle(null);
  };

  render() {
    const { id, items, activeItem, toggle, onChange } = this.props;
    return (
      <Subscribe to={[dropdownContainer]}>
        {container => (
          <>
            <button
              className="button sort__button"
              onClick={() => container.toggle(id)}
              ref={this.buttonRef}
            >
              {activeItem}
            </button>
            <Modal>
              {container.state.active === id && (
                <>
                  <div
                    className="dropdown"
                    style={{
                      top:
                        this.buttonRef.current.getBoundingClientRect().bottom +
                        20,
                      left: this.buttonRef.current.getBoundingClientRect().left,
                    }}
                  >
                    <ul className="list-bare">
                      {items.map((item, i) => (
                        <li
                          className={objstr({
                            dropdown__active: item === activeItem,
                          })}
                          onClick={() => onChange(item)}
                          key={i}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </Modal>
          </>
        )}
      </Subscribe>
    );
  }
}

export default Dropdown;
