import Lotto from './Lotto.js';

export default class WinningNumber {
    #set;
    #bonus;

    constructor(mainNumbers, bonus){
        const lotto = new Lotto(mainNumbers);
        this.#set = new Set(lotto.numbers);

        if(!Number.isInteger(bonus) || bonus < 1 || bonus > 45){
            throw new Error('[ERROR] 보너스 번호는 1~45사이의 정수여야 합니다.');
        }
        if (this.#set.has(bonus)){
            throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.');
        }
        this.#bonus = bonus;
    }

    has(n) {
        return this.#set.has(n);
    }

    isBonusMatched(ticket){
        return ticket.numbers.includes(this.#bonus);
    }
}