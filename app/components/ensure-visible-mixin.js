import React, { Component } from 'react';

const EnsureVisibleMixin = InnerComponent => class extends Component {
  constructor(props) {
    super(props);
    this.ensureVisible = this.ensureVisible.bind(this);
    this.getNode = this.getNode.bind(this);
  }

  componentDidMount() {
    this.ensureVisible();
  }

  componentDidUpdate() {
    this.ensureVisible();
  }

  getNode(node) {
    this.node = node;
  }

  // TODO Put this in prop
  ensureVisible() {
    const { index, selectedVideo } = this.props;
    if (selectedVideo === index) {
      this.node.scrollIntoViewIfNeeded(false);
    }
  }

  render () {
    return <InnerComponent getNode={this.getNode} {...this.props} />;
  }
};

export default EnsureVisibleMixin;
