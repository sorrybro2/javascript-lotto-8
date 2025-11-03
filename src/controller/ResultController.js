import StatsService from '../service/StatsService.js';
import OutputView from '../view/OutputView.js';

export default class ResultController {
  static async show(tickets, amount, winning) {
    const result = StatsService.buildResult(tickets, winning);
    const yieldRate = StatsService.yieldRate(result.total, amount);
    OutputView.printStats(result, yieldRate);
  }
}
