import { Random } from "@woowacourse/mission-utils";
import Lotto from "../model/Lotto.js";

export default class LottoService{
    static generateTickets(count){
        const tickets = []
        for (let i = 0; i < count; i++){
            const nums = Random.pickUniqueNumbersInRange(1, 45, 6);
            tickets.push(new Lotto(nums))
        }
        return tickets;
    }
}