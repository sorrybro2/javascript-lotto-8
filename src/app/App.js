import PurchaseController from "../controller/PurchaseController";
import ResultController from "../controller/ResultController";
import WinningController from "../controller/WinningController";

class App{
    async run() {
        const tickets = await PurchaseController.buy();
        const winning = await WinningController.input();
        await ResultController.show(tickets, winning);
    }
}

export default App;