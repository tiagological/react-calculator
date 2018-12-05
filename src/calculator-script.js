class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOnScreen: '',
      result: 0,
      charLength: 0
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
    this.equals = this.equals.bind(this);
    this.operate = this.operate.bind(this);
    this.addDecimal = this.addDecimal.bind(this);
  }

  clearDisplay() {
    this.setState({
      numOnScreen: '',
      result: 0,
      charLength: 0
    });
  }

  // updates the number on the screen

  setDisplay(e) {
    this.setState({
      numOnScreen:
        this.state.result === 'DIGIT LIMIT MET'
          ? this.state.numOnScreen + ''
          : /^0$/.test(this.state.numOnScreen) === true
          ? e.target.value
          : this.state.numOnScreen + e.target.value,
      // below checks if the number on screen ends with a zero or is a plus, minus, multiple or divide sign and if so, it replaces it with the input, if not, it appends to the input
      result:
        this.state.result.length > 13
          ? 'DIGIT LIMIT MET'
          : /^0$/.test(this.state.result) === true
          ? e.target.value
          : this.state.result === '+'
          ? e.target.value
          : this.state.result === '-'
          ? e.target.value
          : this.state.result === '*'
          ? e.target.value
          : this.state.result === '/'
          ? e.target.value
          : this.state.result + e.target.value
    });
  }

  operate(e) {
    this.setState({
      // is there an equals sign in the display? if so, start the calculation on the result of the previous evaluation, else, if the last character is an operator, replace that operator with the operator selected
      numOnScreen:
        /=/.test(this.state.numOnScreen) === true
          ? this.state.result + e.target.value
          : this.state.result === '+'
          ? this.state.numOnScreen.replace(/.$/, e.target.value)
          : this.state.result === '-'
          ? this.state.numOnScreen.replace(/.$/, e.target.value)
          : this.state.result === '*'
          ? this.state.numOnScreen.replace(/.$/, e.target.value)
          : this.state.result === '/'
          ? this.state.numOnScreen.replace(/.$/, e.target.value)
          : this.state.numOnScreen + e.target.value,
      result: e.target.value
    });
  }

  addDecimal(e) {
    this.setState({
      // is the number in the display a zero? if it is, render '0.' in the display
      numOnScreen:
        this.state.result === 0
          ? '0.'
          : /\.$/.test(this.state.result) === true
          ? this.state.numOnScreen + ''
          : /\./.test(this.state.result) === true
          ? this.state.numOnScreen + ''
          : this.state.numOnScreen + e.target.value,
      result:
        /\.$/.test(this.state.result) === true
          ? this.state.result + ''
          : /\./.test(this.state.result) === true
          ? this.state.result + ''
          : this.state.result + e.target.value
    });
  }

  // performs calculation on arithmetic that is on screen and outputs results

  equals() {
    this.setState({
      numOnScreen: this.state.numOnScreen + '=' + eval(this.state.numOnScreen),
      result: eval(this.state.numOnScreen)
    });
  }

  render() {
    return (
      <div id='calculatorBody'>
        <div id='numOnScreen'>{this.state.numOnScreen}</div>
        <div id='display'>{this.state.result}</div>
        <button id='clear' onClick={this.clearDisplay}>
          AC
        </button>
        <button id='divide' value='/' onClick={this.operate}>
          &#247;
        </button>
        <button id='multiply' value='*' onClick={this.operate}>
          x
        </button>
        <button id='seven' value='7' onClick={this.setDisplay}>
          7
        </button>
        <button id='eight' value='8' onClick={this.setDisplay}>
          8
        </button>
        <button id='nine' value='9' onClick={this.setDisplay}>
          9
        </button>
        <button id='subtract' value='-' onClick={this.operate}>
          -
        </button>
        <button id='four' value='4' onClick={this.setDisplay}>
          4
        </button>
        <button id='five' value='5' onClick={this.setDisplay}>
          5
        </button>
        <button id='six' value='6' onClick={this.setDisplay}>
          6
        </button>
        <button id='add' value='+' onClick={this.operate}>
          +
        </button>
        <button id='one' value='1' onClick={this.setDisplay}>
          1
        </button>
        <button id='two' value='2' onClick={this.setDisplay}>
          2
        </button>
        <button id='three' value='3' onClick={this.setDisplay}>
          3
        </button>
        <button id='equals' onClick={this.equals}>
          =
        </button>
        <button id='zero' value='0' onClick={this.setDisplay}>
          0
        </button>
        <button id='decimal' value='.' onClick={this.addDecimal}>
          .
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
