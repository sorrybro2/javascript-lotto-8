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

    // 티켓 개수 만큼 6개 숫자 렌덤돌리기 후 당첨 번호 입력받기 (Lotto.js)

    // 당첨 개수 구하기

    // 당첨 통계 및 수익률 출력하기
  }
}

async #askAmount(){
  while(true){
    try{
      const input = await Console.readLineAsync("구입금액을 입력해주세요.\n");
      const amount = Number(input);

      if(!Number.isInteger(amount)){
        throw new Error("[ERROR] 구입 금액은 정수여야 합니다.")
      }
      if(amount < PRICE){
        throw new Error("[ERROR] 복권 구매 가격보단 커야합니다.")
      }
      if(amount % PRICE !== 0){
        throw new Error("[ERROR] 구매 가격과 나눠 떨어지는 가격을 입력해야합니다.");
      }
      return amount;
    }catch(e){
      Console.print(e.message);
    }
  }
}

export default App;
