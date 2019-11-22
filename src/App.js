import React from 'react';
import LetterCell from "./Components/LetterCell";
import Button from "./Components/Button";
import './App.css';
// import * as path from "\\images";

const words = ["MONSTER", "TABLE", "FORREST", "JUICE", "APPLE", "QUEEN", "KING", "FLY"];
const images = ["./images/1.png", "./images/2.png", "./images/3.png", "./images/4.png", "./images/5.png", "./images/6.png", "./images/7.png", "./images/8.png"];
const maxHp = images.length;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.setRandomWord = this.setRandomWord.bind(this);
    this.generateAlphabet = this.generateAlphabet.bind(this);
    this.generateHiddenWord = this.generateHiddenWord.bind(this);
    this.generateHiddenTable = this.generateHiddenTable.bind(this);
    this.generateButtonsClassNames = this.generateButtonsClassNames.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.checkWin = this.checkWin.bind(this);


    const word = this.setRandomWord();
    const letters = this.generateHiddenWord(word);
    const buttonsClassNames = this.generateButtonsClassNames();

    this.state = {
      hp: maxHp,
      word,
      letters,
      status: images[0],
      buttonsClassNames
    };
  }

  setRandomWord() {
    return words[Math.floor(Math.random() * 1000) % words.length];
  }

  resetAll() {
    const word = this.setRandomWord();
    const letters = this.generateHiddenWord(word);
    const buttonsClassNames = this.generateButtonsClassNames();

    this.setState({
      hp: maxHp,
      word,
      letters,
      buttonsClassNames
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

  generateButtonsClassNames() {
    const buttonsClassNames = {};
    for (let i = 65; i < 91; ++i) {
      buttonsClassNames[String.fromCharCode(i)] = "button";
    }

    return buttonsClassNames;
  }

  generateAlphabet() {
    const cells = [[], [], []];
    for (let i = 65; i < 91; ++i) {
      const index = i < 75 ? 0 : (i < 85 ? 1 : 2);
      const letter = String.fromCharCode(i);
      cells[index].push(<td><Button className={ this.state.buttonsClassNames[letter] } text={ letter } handleButtonClicked={ this.handleButtonClicked } /></td>);
    }

    const rows = cells.map((value) => {
      return <tr>{value}</tr>;
    });

    this.tableAlphabet = <table className="table-alphabet">{ rows }</table>;

    return 0;
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
        const { letters, buttonsClassNames } = this.state;
        if (buttonsClassNames[text].search("chosen-button") !== -1) {
          return;
        }

        buttonsClassNames[text] += " chosen-button";

        letters[text] = true;
        this.setState({ letters });
      } else {
        let { hp, buttonsClassNames } = this.state;
        if (buttonsClassNames[text].search("chosen-button") !== -1) {
          return;
        }

        buttonsClassNames[text] += " chosen-button";
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
    this.generateAlphabet();
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
