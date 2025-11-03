import WinningNumber from "../model/winningNumber";
import InputView from "../view/InputView";

export default class WinningController{
    static async input(){
        const winningNums = await InputView.readWinning();
        const bonus = await InputView.readBonus();
        return new WinningNumber(winningNums, bonus);
    }
}