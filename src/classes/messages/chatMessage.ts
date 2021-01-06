import { Message, MessageType } from "../message";

export class ChatMessage extends Message {

    private message: string;
    constructor(data: any) {
        super(data);
        this.message = data.message;
    }

    public getMessage(): string {
        return this.message;
    }

    protected setType(): void {
        this.type = MessageType.ChatMessage;
    }

    protected validateData(data) {
        let valid = false;
        if (data.message) {
            valid = true;
        }
        return valid;
    }

}