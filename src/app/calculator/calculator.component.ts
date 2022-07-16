import { Component } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

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
  async pressEval(): Promise<void> {
    let operatorIndex: number;
    let operation: string;
    let number1: number;
    let number2: number;

    if (!this.validateCurrentState()) return;

    operatorIndex = this.findOperatorIndex();
    operation = this.input[operatorIndex];
    number1 = parseFloat(this.input.slice(0,operatorIndex));
    number2 = parseFloat(this.input.slice(operatorIndex + 1));
    
    this.operatorSet === false;
    this.decimalSet === false;

    let res: AxiosResponse = await axios.get('http://localhost:5000/calculate', {
      params: {
        number1: number1,
        number2: number2,
        operation: operation
      }
    })
    if(res){
      console.log(res.data);
      this.input = res.data;
    }
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
