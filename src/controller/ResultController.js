import StatsService from '../service/StatsService.js';
import OutputView from '../view/OutputView.js';

export default class ResultController {
  static async show(tickets, winning) {
    const result = StatsService.buildResult(tickets, winning);
    const spent = tickets._spent ?? 0;
    const yieldRate = StatsService.yieldRate(result.total, spent);
    OutputView.printStats(result, yieldRate);
  }
}
