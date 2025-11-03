import { PRIZE } from "../util/constants";

export default class StatsService{
    static buildResult(tickets, winning){
        const counts = { 3:0, 4:0, 5:0, "5b":0, 6:0};

        tickets.forEach(t=>{
            const match = t.numbers.filter(n => winning.has(n)).length;

            if (match === 6) counts[6]++;
            else if (match === 5) (winning.isBonusMatched(t) ? counts['5b']++ : counts[5]++);
            else if (match === 4) counts[4]++;
            else if (match === 3) counts[3]++;
        });

       const total = 
        counts[6] * PRIZE[6] +
        counts["5b"] * PRIZE["5b"] +
        counts[5] * PRIZE[5] +
        counts[4] * PRIZE[4] +
        counts[3] * PRIZE[3];

        return { counts, total }
    }
    static yieldRate(total, spent){
        return Math.round(((total / spent) * 100) * 10) / 10;
    }
}