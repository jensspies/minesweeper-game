import { Message, MessageType } from "../message";

export class GameStatusMessage extends Message {

    private timestamp = 0;
    private id = '';
    private boardCells: any;
    private height: number;
    private width: number;
    public gameStatus: any;
    constructor(data: any) {
        super(data);
        this.id = data.gameId;
        this.boardCells = data.currentState;
        this.timestamp = data.timestamp;
        this.width = data.width;
        this.height = data.height;
        this.gameStatus = data.gameState;
    }

    public getId(): string {
        return this.id;
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