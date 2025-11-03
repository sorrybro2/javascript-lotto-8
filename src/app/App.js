class App{
    async run() {
        const tickets = await PurchaseController.buy();
        const winning = await WinningController.input();
        await ResultController.show(tickets, winning);
    }
}

export default App;