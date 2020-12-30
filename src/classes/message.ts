export enum MessageType {
    WelcomeMessage = 'WelcomeMessage'
    , ChatMessage = 'ChatMessage'
    , GameTypes = 'GameTypes'
}

export const getMessageTypes = function (): MessageType[] {
    const typeNames = Object.keys(MessageType)
        .filter((key)  => {
            return isNaN(Number(key));
        });
    const messageTypes: MessageType[] = [];
    typeNames.forEach((messagType) => {
        messageTypes.push(MessageType[messagType]);
    });
    return messageTypes;
}

/* export const getMessageTypeMapping = function (): Map<MessageType, Message> {
    const typeNames = Object.keys(MessageType)
        .filter((key)  => {
            return isNaN(Number(key));
        });
    const mapEntries: any = [];
    typeNames.forEach((messageType) => {
        // mapEntries.push(MessageType[messageType], eval(messageType));
    });
    const messageTypes: Map<MessageType, Message> = new Map(mapEntries);
    return messageTypes;
} */

export abstract class Message {
    protected type: MessageType;

    constructor(data: any) {
        this.setType();
        if (this.validateData(data) === false) {
            throw new Error ('wrong data object given');
        }
    }

    protected validateData(data: any): boolean {
        return false;
    }

    protected abstract setType(): void;

    public getType(): MessageType {
        return this.type;
    }
}