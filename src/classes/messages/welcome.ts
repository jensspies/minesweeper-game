import { Message, MessageType } from "../message";

export class WelcomeMessage extends Message {

    private id = '';
    constructor(data: any) {
        super(data);
        this.id = data.welcome;
    }

    public getId(): string {
        return this.id;
    }

    protected setType(): void {
        this.type = MessageType.WelcomeMessage;
    }

    protected validateData(data) {
        let valid = false;
        if (data.welcome) {
            valid = true;
        }
        return valid;
    }

}