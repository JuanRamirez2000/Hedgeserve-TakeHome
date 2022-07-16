import { Component, OnInit } from '@angular/core';

const VALID_OPERATORS: string[] = ['+', '-', '*', '/']


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent{
  input: string = '';

  //Booleans to control only one input
  decimalSet: boolean = false;
  operatorSet: boolean = false;

  //functionality for pressing keys
  pressKey(key: string): void{

    if(this.operatorSet && VALID_OPERATORS.includes(key)) return;
    if(this.decimalSet && key === '.') return;

    //if key is an operator and it is not set
    if(VALID_OPERATORS.includes(key) && !this.operatorSet){
      if(this.input.length === 0) return;

      this.operatorSet = true;
      this.decimalSet = false;
    }

    //Handling decimal logic
    if(key === '.' && !this.decimalSet) {
      if (this.input.length === 0 || VALID_OPERATORS.includes(this.input.slice(-1))) this.input += 0;

      this.decimalSet = true;
    }

    this.input += key;
    return;
  }

  //This will clear the calculator and return to defaults
  clearCalculator(): void {
    this.input = '';
    this.decimalSet = false;
    this.operatorSet = false;
  }

  //Logic for pressing the backbutton
  pressBack(): void {
    if (this.input.length === 0) return;

    if (VALID_OPERATORS.includes(this.input.slice(-1))) { this.operatorSet = false; }
    if (this.input.slice(-1) === '.') { this.decimalSet = false; }

    this.input = this.input.slice(0 , -1);
  }

  //Logic for evaluating the expression
  pressEval(): void {
    let operatorIndex: number = 0;
    let operation: string = '';
    let number1: number;
    let number2: number;

    if (!this.validateCurrentState()) return;
    
    VALID_OPERATORS.forEach((operator: string) => {
      if(this.input.includes(operator)) operation = operator;
    });

    operatorIndex = this.findOperatorIndex();
    number1 = parseFloat(this.input.slice(0,operatorIndex));
    number2 = parseFloat(this.input.slice(operatorIndex + 1));
    
    console.log(number1, operation, number2) 

    if (operation === '+') this.input = (number1 + number2).toString();
    if (operation === '-') this.input = (number1 - number2).toString();
    if (operation === '*') this.input = (number1 * number2).toString();
    if (operation === '/') this.input = (number1 / number2).toString();
  }

  // function used to validate the state of the calculator
  validateCurrentState(): boolean {
    let operatorIndex: number = 0;

    // if there is no input
    if (this.input.length === 0)return false;

    // if there is no operator
    if (!this.operatorSet) return false;

    // if there is nothing on right of operator
    operatorIndex = this.findOperatorIndex();
    if (operatorIndex === this.input.length - 1) {
      return false
    };

    return true;
  }

  //Finds the index of an operator
  findOperatorIndex(): number {
    let operatorIndex:number = 0;
    VALID_OPERATORS.forEach((operator: string) => {
      if (this.input.includes(operator)) operatorIndex = this.input.indexOf(operator);
    })
    return operatorIndex;
  }

}
