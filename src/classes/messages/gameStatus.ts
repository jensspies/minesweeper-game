import { Message, MessageType } from "../message";

export class GameStatusMessage extends Message {

    private timestamp = 0;
    private id = '';
    private boardCells: any;
    constructor(data: any) {
        super(data);
        this.id = data.gameId;
        this.boardCells = data.currentState;
        this.timestamp = data.timestamp;
    }

    public getId(): string {
        return this.id;
    }

    protected setType(): void {
        this.type = MessageType.GameStatus;
    }

    protected validateData(data) {
        let valid = false;
        if (data.gameId && data.timestamp) {
            valid = true;
        }
        return valid;
    }

}