import LottoService from "../service/LottoService";
import { PRICE } from "../util/constants";
import InputView from "../view/InputView";
import OutputView from "../view/OutputView";

export default class PurchaseController{
    static async buy(){
        const amount = await InputView.readAmount();
        const count = amount/PRICE;
        const tickets = LottoService.generateTickets(count);
        OutputView.printTickets(tickets);

        return tickets;
    }
}