import React from 'react';

require('./TagItem.scss');

class TagItem extends React.Component {
  static propTypes = { tag: React.PropTypes.string.isRequired };

  render() {
    return (
      <a className="tag-item" href="#">#{this.props.tag}</a>
    );
  }
}

module.exports = TagItem;
