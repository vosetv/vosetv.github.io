import React, { Component } from 'react';

const ensureVisible = InnerComponent =>
  class extends Component {
    componentDidMount() {
      this.scrollIntoViewIfNeeded();
    }

    componentDidUpdate() {
      this.scrollIntoViewIfNeeded();
    }

    getNode = node => {
      this.node = node;
    };

    // TODO Put this in prop
    scrollIntoViewIfNeeded() {
      if (this.props.scrollIntoView) {
        this.node.scrollIntoViewIfNeeded(false);
      }
    }

    render() {
      return <InnerComponent getNode={this.getNode} {...this.props} />;
    }
  };

export default ensureVisible;
