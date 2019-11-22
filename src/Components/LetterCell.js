import React from 'react';

class LetterCell extends React.Component {
  render() {
    return (
      <div className="lettercell-container">
        <span className="hidden-letter">{ this.props.isGuessed ? this.props.letter : "" }</span>
        <div className="lettercell-underscore"></div>
      </div>
    );
  }
}

export default LetterCell;
