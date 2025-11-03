class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a,b) => a-b);
  }

  #validate(numbers) {
    if (!Array.isArray(numbers)){
      throw new Error("[ERROR] 로또 번호는 배열이어야 합니다.")
    }
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    const set = new Set(numbers);
    if (set.size !== 6) {
      throw new Error("[ERROR] 로또 번호는 중복될 수 없습니다.")
    }
    const inRangeInt = numbers.every( n =>
      Number.isInteger(n) && n >= 1 && n <= 45
    );
    if (!inRangeInt){
      throw new Error("[ERROR] 로또 번호는 정수이면서 1~45 사이의 숫자여야 합니다.")
    }
  }

  get numbers() {
    return this.#numbers;
  }

  toString() {
    return `[${this.#numbers.join(', ')}]`;
  }
}

export default Lotto;
