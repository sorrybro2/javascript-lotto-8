import { Console } from "@woowacourse/mission-utils";


const OutputView = {
    printTickets(tickets){
        Console.print(`${tickets.length}개를 구매했습니다.`);
        tickets.forEach(t => {
            Console.print(`[${t.numbers.join(', ')}]`)
        });
    },

    printStats(result, yieldRate){
        const { counts } = result;
        const rounded = yieldRate;

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

export default OutputView;