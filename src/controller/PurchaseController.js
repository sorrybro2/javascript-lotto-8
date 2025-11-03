import LottoService from "../service/LottoService.js";
import { PRICE } from "../util/constants.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

export default class PurchaseController{
    static async buy(){
        const amount = await InputView.readAmount();
        const count = amount/PRICE;
        const tickets = LottoService.generateTickets(count);
        OutputView.printTickets(tickets);

        return { tickets, amount };
    }
}