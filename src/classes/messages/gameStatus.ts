import { Message, MessageType } from "../message";

export class GameStatusMessage extends Message {

    public timestamp = 0;
    public gameId: number = -1;
    public boardCells: any;
    public height: number;
    public width: number;
    public gameStatus: any;
    public markedBombs: number;
    public totalBombCount: any;
    public gameWon: boolean;
    public cellRows: any[];
    public isOver: boolean;
    constructor(data: any) {
        super(data);
        this.gameId = parseInt(data.gameId);
        this.boardCells = data.currentState;
        this.timestamp = data.timestamp;
        this.width = data.width;
        this.height = data.height;
        this.gameStatus = data.gameState;
        this.setBoardRows();
        this.gameWon = data.gameState === 'Won';
        this.markedBombs = data.markedBombs;
        this.totalBombCount = data.totalBombCount
        this.isOver = data.isOver;
    }

    protected setType(): void {
        this.type = MessageType.GameStatus;
    }

    public getCells() {
        return this.boardCells;
    }

    public getHeight() {
        return this.height;
    }

    public getWidth() {
        return this.width;
    }

    public getMarkedBombs() {
        return this.markedBombs;
    }

    public getTotalBombs() {
        return this.totalBombCount;
    }

    public getGameStatus() {
        return this.gameStatus;
    }

    protected validateData(data) {
        let valid = false;
        if (data.type === this.type.toString()) {
            valid = true;
        }
        return valid;
    }

    private setBoardRows() {
        const rows = [];
        let startIndex = 0;
        const width = this.getWidth();
        const height = this.getHeight();
        const maximumIndex = (height * width);
        while (startIndex + width <=  maximumIndex) {
            rows.push(this.getCells().filter( (item, index) => {
                const greaterThanMinIndex = index >= startIndex;
                const smallerThanMaxIndex = index < startIndex + width;
                return greaterThanMinIndex && smallerThanMaxIndex;
            }));
            startIndex += width;
        }
        this.cellRows = rows;
    }
}