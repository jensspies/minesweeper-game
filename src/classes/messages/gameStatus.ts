import { Message, MessageType } from "../message";

export class GameStatusMessage extends Message {

    private timestamp = 0;
    private gameId = '';
    private boardCells: any;
    private height: number;
    private width: number;
    private gameStatus: any;
    private markedBombs: number;
    private totalBombCount: any;
    constructor(data: any) {
        super(data);
        this.gameId = data.gameId;
        this.boardCells = data.currentState;
        this.timestamp = data.timestamp;
        this.width = data.width;
        this.height = data.height;
        this.gameStatus = data.gameState;
        this.markedBombs = data.markedBombs;
        this.totalBombCount = data.totalBombCount
    }

    public getId(): string {
        return this.gameId;
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
        if (data.gameId && data.timestamp) {
            valid = true;
        }
        return valid;
    }

}