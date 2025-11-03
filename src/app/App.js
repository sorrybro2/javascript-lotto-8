import PurchaseController from "../controller/PurchaseController.js";
import ResultController from "../controller/ResultController.js";
import WinningController from "../controller/WinningController.js";

class App{
    async run() {
        const { tickets,amount } = await PurchaseController.buy();
        const winning = await WinningController.input();
        await ResultController.show(tickets, amount, winning);
    }
}

export default App;