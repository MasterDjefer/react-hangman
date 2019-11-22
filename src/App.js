import React from 'react';
import LetterCell from "./Components/LetterCell";
import Button from "./Components/Button";
import './App.css';
// import * as path from "\\images";

const words = ["MONSTER", "OUTSIDER", "PLOT", "JUICE", "STEP", "MUTATION", "KING", "ELEPHANT"];
const images = ["./images/1.png", "./images/2.png", "./images/3.png", "./images/4.png", "./images/5.png", "./images/6.png", "./images/7.png", "./images/8.png"];
const maxHp = images.length;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.setRandomWord = this.setRandomWord.bind(this);
    this.generateAlphabet = this.generateAlphabet.bind(this);
    this.generateHiddenWord = this.generateHiddenWord.bind(this);
    this.generateHiddenTable = this.generateHiddenTable.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.checkWin = this.checkWin.bind(this);


    this.generateAlphabet();

    const word = this.setRandomWord();
    const letters = this.generateHiddenWord(word);

    this.state = {
      hp: maxHp,
      word,
      letters,
      status: images[0]
    };
  }

  setRandomWord() {
    return words[Math.floor(Math.random() * 1000) % words.length];
  }

  resetAll() {
    const word = this.setRandomWord();
    const letters = this.generateHiddenWord(word);

    this.setState({
      hp: maxHp,
      word,
      letters
    });
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
    const cells = this.state.word.split("").map((value) => {
      return <td><LetterCell isGuessed={ this.state.letters[value] } letter={value} /></td>;
    });

    this.tableLetters = <table className="table-hidden-word"><tr>{ cells }</tr></table>;
  }

  generateHiddenWord(word) {
    const letters = {};
    word.split("").filter((element, index, array) => array.indexOf(element) === index).forEach((value) => {
      letters[value] = false;
    });

    return letters;
  }

  handleButtonClicked(text) {
    if (text === "Reset") {
      this.resetAll();
    } else {
      if (this.state.word.search(text) !== -1) {
        const { letters } = this.state;
        letters[text] = true;
        this.setState({ letters });
      } else {
        let { hp } = this.state;
        hp--;

        if ( hp === 1 ) {
          this.setState({ hp });
          alert(`you're looser. word was: ${this.state.word}.`);
          this.resetAll();
          return;
        }

        this.setState({ hp });
      }

      if (this.checkWin()) {
        alert(`you're winner. word was: ${this.state.word}.`);
        this.resetAll();
      }
    }
  }

  render() {
    this.generateHiddenTable();
    return (
      <div className="container">
        <div className="hang-status">
          {/* <span className="hp">{ this.state.hp }</span> */}
          <img src={images[maxHp - this.state.hp]} />
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
