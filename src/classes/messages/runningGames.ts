import { Message, MessageType } from "../message";

export class RunningGamesMessage extends Message {

    private data: any[];
    constructor(data: any) {
        super(data);
        this.data = data.data;
    }


    protected setType(): void {
        this.type = MessageType.OpenGames;
    }

    protected validateData(data) {
        let valid = false;
        if (data.type === this.type.toString()) {
            valid = true;
        }
        return valid;
    }

}