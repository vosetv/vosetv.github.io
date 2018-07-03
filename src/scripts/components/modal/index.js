import React, { Component } from 'react';
import { createPortal } from 'react-dom';

function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

const modalRoot = canUseDOM() ? document.getElementById('modal') : null;

export default class Modal extends Component {
  el = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return canUseDOM() ? createPortal(this.props.children, this.el) : null;
  }
}
