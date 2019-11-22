import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  onButtonClicked(event) {
    this.props.handleButtonClicked(event.target.innerText);
  }

  render() {
    return (
      <span className={ this.props.className } onClick={ this.onButtonClicked }>{ this.props.text }</span>
    );
  }
}

export default Button;
