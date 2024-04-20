import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    let expression = calcBody.expression;
    expression = expression.replace(/\s+/g, '');
    const numberPattern = /\d+(\.\d+)?/g;
    const operatorPattern = /[+\-*/]/g;
    const numbers = expression.match(numberPattern);
    const operators = expression.match(operatorPattern);
    const operate = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '*' || operators[i] === '/') {
        let result = operate[operators[i]](
          parseFloat(numbers[i]),
          parseFloat(numbers[i + 1]),
        );
        numbers.splice(i, 2, result);
        operators.splice(i, 1);
      }
    }
    let result = parseFloat(numbers[0]);
    for (let i = 0; i < operators.length; i++) {
      result = operate[operators[i]](result, parseFloat(numbers[i + 1]));
    }
    if (Number.isNaN(result)) {
      throw new BadRequestException('Invalid expression provided');
    }
    return result;
  }
}
