import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import objstr from 'obj-str';
import Modal from '../modal';
import dropdownContainer from './container';
import './styles.css';

class Dropdown extends Component {
  buttonRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOut);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOut);
  }

  handleClickOut = event => {
    if (['dropdown', 'button button--dropdown'].includes(event.target.className)) return;
    dropdownContainer.toggle(null);
  };

  render() {
    const { id, items, activeItem, toggle, onChange } = this.props;
    return (
      <Subscribe to={[dropdownContainer]}>
        {container => (
          <React.Fragment>
            <button
              className="button button--dropdown"
              onClick={() => container.toggle(id)}
              ref={this.buttonRef}
            >
              {activeItem}
            </button>
            <Modal>
              {container.state.active === id && (
                <React.Fragment>
                  <div
                    className="dropdown"
                    style={{
                      top: this.buttonRef.current.getBoundingClientRect().bottom + 20,
                      left: this.buttonRef.current.getBoundingClientRect().left,
                    }}
                  >
                    <ul className="list">
                      {items.map((item, i) => (
                        <li
                          className={objstr({
                            dropdown__active: item === activeItem,
                          })}
                          onClick={() => onChange({ [id]: item })}
                          key={i}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              )}
            </Modal>
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.any.isRequired,
};

export default Dropdown;
