import { Message, MessageType } from "../message";

export class GameIdMessage extends Message {

    private id = '';
    constructor(data: any) {
        super(data);
        this.id = data.gameId;
    }

    public getId(): string {
        return this.id;
    }

    protected setType(): void {
        this.type = MessageType.GameId;
    }

    protected validateData(data) {
        let valid = false;
        if (data.gameId && !data.timestamp) {
            valid = true;
        }
        return valid;
    }

}