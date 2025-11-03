import { Console } from '@woowacourse/mission-utils';
import { PRICE } from '../util/constants.js';

const InputView = {
  async readAmount() {
    while (true) {
      try {
        const line = await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        const amount = Number(line);

        if (!Number.isInteger(amount)) throw new Error('[ERROR] 구입 금액은 정수여야 합니다.');
        if (amount < PRICE) throw new Error('[ERROR] 구입 금액은 1,000원 이상이어야 합니다.');
        if (amount % PRICE !== 0) throw new Error('[ERROR] 구입 금액은 1,000원으로 나누어 떨어져야 합니다.');

        return amount;
      } catch (e) {
        Console.print(e.message);
      }
    }
  },

  async readWinning() {
    while (true) {
      try {
        const input = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
        const nums = input.split(',').map(s => Number(s));
        return nums;
      } catch (e) {
        Console.print(e.message);
      }
    }
  },

  async readBonus(winningNumbers) {
    while (true) {
      try {
        const input = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
        if (input.includes(',')) throw new Error('[ERROR] 보너스 번호는 하나의 숫자만 가능합니다.');
        const num = Number(input);
        if (!Number.isInteger(num)) throw new Error('[ERROR] 보너스 번호는 정수여야 합니다.');
        if (num < 1 || num > 45) throw new Error('[ERROR] 보너스 번호는 1~45 사이의 숫자여야 합니다.');
        if (winningNumbers.includes(num)) throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
        return num;
      } catch (e) {
        Console.print(e.message);
      }
    }
  },
};

export default InputView;
