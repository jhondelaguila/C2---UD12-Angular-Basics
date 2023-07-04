import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calculadora';
  screenOperation: string = '';
  screenResult: string = '';
  keyResult: boolean = false;

  click(key: string) {
    if (this.keyResult) {
      this.screenOperation = '' + key;
      this.screenResult = '';
      this.keyResult = false;
    } else this.screenOperation = this.screenOperation + key;
  }

  clear() {
    this.screenOperation = '';
    this.screenResult = '';
  }

  result() {
    const numbers = this.screenOperation.match(/[+\-]?([0-9]*[.])?[0-9]+/g);
    const operators = this.screenOperation.match(/[-+*/]/g);

    if (!numbers || !operators) {
      this.screenResult = 'Error';
    } else {
      let total = parseFloat(numbers[0]);
      let i = 0;

      operators.forEach((operator: string) => {
        const number = parseFloat(numbers[i + 1]);
        i++;

        switch (operator) {
          case '*':
            total *= number;
            break;
          case '/':
            total /= number;
            break;
        }
      });

      i = 0;
      operators.forEach((operator: string) => {
        const number = parseFloat(numbers[i + 1]);
        i++;

        switch (operator) {
          case '+':
            total += number;
            break;
          case '-':
            total -= number;
            break;
        }
      });
      this.screenResult = total.toString();
    }

    this.keyResult = true;
  }
}
