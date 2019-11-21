import React from 'react';
import './App.css';

class LetterCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lettercell-container">
        <span className="hidden-letter">{ this.props.isGuessed ? this.props.letter : "" }</span>
        <div className="lettercell-underscore"></div>
      </div>
    );
  }
}

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.word = "FOOTBALL";



    this.generateAlphabet = this.generateAlphabet.bind(this);
    this.generateHiddenWord = this.generateHiddenWord.bind(this);
    this.generateHiddenTable = this.generateHiddenTable.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);

    this.generateAlphabet();
    const letters = this.generateHiddenWord();

    this.state = {
      hp: 3,
      letters
    };

    this.generateHiddenTable();
  }

  generateAlphabet() {
    const cells = [[], [], []];
    for (let i = 65; i < 91; ++i) {
      const index = i < 75 ? 0 : (i < 85 ? 1 : 2);
      cells[index].push(<td><Button className="button" text={ String.fromCharCode(i) } handleButtonClicked={ this.handleButtonClicked } /></td>);
    }

    const rows = cells.map((value) => {
      return <tr>{value}</tr>;
    });

    this.tableAlphabet = <table className="table-alphabet">{ rows }</table>;
  }

  generateHiddenTable() {
    const cells = this.word.split("").map((value) => {
      return <td><LetterCell isGuessed={ this.state.letters[value] } letter={value}/></td>;
    });

    this.tableLetters = <table className="table-hidden-word"><tr>{ cells }</tr></table>;
  }

  generateHiddenWord() {
    const letters = {};
    this.word.split("").filter((element, index, array) => array.indexOf(element) === index).forEach((value) => {
      letters[value] = false;
    });

    return letters;
  }

  handleButtonClicked(text) {
    if (text === "Reset") {

    } else {
      if (this.word.search(text) !== -1) {
        const { letters } = this.state;
        letters[text] = true;
        console.log(letters);
        this.setState({ letters });
        console.log(letters);
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="hang-status">
          <span>{ this.state.hp }</span>
          { this.tableLetters }
        </div>

        <div className="letters">

          { this.tableAlphabet }

          <Button className="button reset-button" text="Reset" handleButtonClicked={ this.handleButtonClicked } />

        </div>
      </div>
    );
  }
}

export default App;
