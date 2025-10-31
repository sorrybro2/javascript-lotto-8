import Lotto from "./Lotto.js";

const PRICE = 1000;
const PRIZE = {
  3: 5_000,
  4: 50_000,
  5: 1_500_000,
  "5b": 30_000_000,
  6: 2_000_000_000,
};

class App {
  async run() {
    // 가격 입력 받고 티켓 개수 구하기
    const amount = await this.#askAmount();
    const count = amount/PRICE;

    Console.print(`${count}개를 구매했습니다.`);

    // 티켓 개수만큼 6개 숫자 랜덤돌리기 (Lotto.js)
    const tickets = Array.from({length: count}, () => {
      const nums = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(nums);
      Console.print(lotto.toString());
      return lotto;
    });

    // 당첨 번호와 보너스 번호 입력
    const winning = await this.#askWinningNum();
    const bonus = await this.#askBounsNum(winning);

    // 당첨 통계 및 수익률 출력하기
  }

  async #askAmount(){
    while(true){
      try{
        const input = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
        const amount = Number(input);

        if(!Number.isInteger(amount)){
          throw new Error("[ERROR] 구입 금액은 정수여야 합니다.");
        }
        if(amount < PRICE){
          throw new Error("[ERROR] 구입 금액은 1,000원 이상이어야 합니다.");
        }
        if(amount % PRICE !== 0){
          throw new Error("[ERROR] 구입 금액은 1,000원으로 나누어 떨어져야 합니다.");
        }
        return amount;
      }catch(e){
          Console.print(e.message);
      }
    }
  }

  async #askWinningNum(){
    while(true){
      try {
        const input = await Console.readLineAsync("당첨 번호를 입력해 주세요.\n");
        const nums = input.split(",").map(Number);
        const lotto = new Lotto(nums);
        return lotto.numbers;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async #askBounsNum(WinningNum){
    while(true){
      try {
        const input = Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
        
        if (input.includes(",")){
          throw new Error("[ERROR] 보너스 번호는 하나의 숫자만 가능합니다.");
        }
        const num = Number(input);
        if (!Number.isInteger(num)){
          throw new Error("[ERROR] 보너스 번호는 정수여야 합니다.")
        }
        if (num < 1 || num > 45){
          throw new Error("[ERROR] 보너스 번호는 1~45 사이의 숫자여야 합니다.")
        }
        if(WinningNum.includes(num)){
          throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.")
        }
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}

export default App;
