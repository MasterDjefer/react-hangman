import React from 'react';
import './App.css';

import LetterCell from "./Components/LetterCell";
import Button from "./Components/Button";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.word = "LUNATIC";

    this.generateAlphabet = this.generateAlphabet.bind(this);
    this.generateHiddenWord = this.generateHiddenWord.bind(this);
    this.generateHiddenTable = this.generateHiddenTable.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.checkWin = this.checkWin.bind(this);

    this.generateAlphabet();
    const letters = this.generateHiddenWord();

    this.state = {
      hp: 3,
      letters
    };
  }

  resetAll() {
    const { letters } = this.state;
    for (const key in letters) {
      letters[key] = false;
    }
    this.setState({ hp: 3, letters });
  }

  checkWin() {
    const { letters } = this.state;
    for (const key in letters) {
      if (!letters[key]) {
        return false;
      }
    }

    return true;
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
      return <td><LetterCell isGuessed={ this.state.letters[value] } letter={value} /></td>;
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
      this.resetAll();
    } else {
      if (this.word.search(text) !== -1) {
        const { letters } = this.state;
        letters[text] = true;
        this.setState({ letters });
      } else {
        let { hp } = this.state;
        hp--;
        this.setState({ hp });

        if ( hp < 1 ) {
          alert("you're looser. restart the game");
          return;
        }
      }

      if (this.checkWin()) {
        alert("you're winner. restart the game");
      }
    }
  }

  render() {
    this.generateHiddenTable();

    return (
      <div className="container">
        <div className="hang-status">
          <span className="hp">{ this.state.hp }</span>
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
