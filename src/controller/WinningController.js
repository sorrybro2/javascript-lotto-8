import WinningNumber from "../model/WinningNumber.js";
import InputView from "../view/InputView.js";

export default class WinningController{
    static async input(){
        const winningNums = await InputView.readWinning();
        const bonus = await InputView.readBonus(winningNums);
        return new WinningNumber(winningNums, bonus);
    }
}