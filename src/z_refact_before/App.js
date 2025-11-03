import Lotto from "./Lotto.js";
import { Console, Random } from "@woowacourse/mission-utils";

// util/constants
const PRICE = 1_000;
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

    // service/LottoService 티켓 개수만큼 6개 숫자 랜덤돌리고 로또 티켓 만들기
    const tickets = []

    for(let i = 0; i < count; i++){
      const nums = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(nums);
      Console.print(lotto.toString());
      tickets.push(lotto);
    }

    // 당첨 번호와 보너스 번호 입력
    const winning = await this.#askWinningNum();
    const bonus = await this.#askBounsNum(winning);

    // 당첨 통계 및 수익률 출력하기
    const stats = this.#calcStats(tickets, winning, bonus);
    this.#printStats(stats, amount)
  }

  // view/inputView
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
        const input = await Console.readLineAsync("보너스 번호를 입력해 주세요.\n");
        
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
        return num;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

// service/StatsService
  #calcStats(tickets, winning, bonus){
    const counts = { 3:0, 4:0, 5:0, "5b":0, 6:0 };

    tickets.forEach(t => {
      const match = t.numbers.filter(n => winning.includes(n)).length;

      if (match == 6) {
        counts[6]++;
      }else if (match == 5) { 
        if (t.numbers.includes(bonus)) counts["5b"]++;
        else counts[5]++;
      }else if (match == 4) {
        counts[4]++;
      }else if (match == 3) {
        counts[3]++;
      }
    });

    const total = 
      counts[6] * PRIZE[6] +
      counts["5b"] * PRIZE["5b"] +
      counts[5] * PRIZE[5] +
      counts[4] * PRIZE[4] +
      counts[3] * PRIZE[3];

    return { counts, total };
  }

  #printStats({counts,total}, amount){
    const rate = (total/amount) * 100;
    const rounded = Math.round(rate * 10)/10;

    Console.print("당첨 통계");
    Console.print("---------");
    Console.print(`3개 일치 (5,000원) - ${counts[3]}개`);
    Console.print(`4개 일치 (50,000원) - ${counts[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${counts[5]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${counts["5b"]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${counts[6]}개`);
    Console.print(`총 수익률은 ${rounded}%입니다.`);
  }
}

export default App;
