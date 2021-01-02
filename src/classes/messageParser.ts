import { myWebsocketId, chatMessageQueue, myCurrentGameId } from '../store';
import { getMessageTypes, Message, MessageType } from './message';
import { ChatMessage } from './messages/chatMessage';
import { GameIdMessage } from './messages/gameId';
import { GameStatusMessage } from './messages/gameStatus';
import { GameTypesMessage } from './messages/gameTypes';
import { WelcomeMessage } from './messages/welcome';

export class MessageParser {
    constructor() {

    };

    parse(data: any) {

        const message: any = this.getMessageObject(data);
        if(message) {
            switch (message.getType()) {
                case MessageType.WelcomeMessage:
                    myWebsocketId.init(message);
                    break;
                case MessageType.ChatMessage:
                    chatMessageQueue.add(message);
                    break;
                case MessageType.GameTypes:
                    console.log(message);
                    break;
                case MessageType.GameId:
                    myCurrentGameId.init(message);
                    break;
                case MessageType.GameStatus:
                    console.log(message);
                    break;
                }

        } else if (data != '') {
            console.log('MessageType not registered:');
            console.log(data);
        }
    }

    private getMessageObject(data): Message|undefined {
        let foundMessage = this.getMessageObjectStatic(data);
        return foundMessage;
    }

    private getMessageObjectStatic(data): Message|undefined {
        let foundMessage: Message = undefined;
        if (data.welcome) {
            foundMessage = new WelcomeMessage(data);
        }
        if (data.message) {
            foundMessage = new ChatMessage(data);
        }
        if (data.type && data.type === 'GameTypes') {
            foundMessage = new GameTypesMessage(data);
        }
        if (data.gameId && !data.timestamp) {
            foundMessage = new GameIdMessage(data);
        }

        if (data.gameId && data.timestamp) {
            foundMessage = new GameStatusMessage(data);
        }
        return foundMessage;
    }

/*     private getMessageObjectDynamic(data): Message|undefined {
        let foundMessage = undefined;
        const availableTypes = getMessageTypes();
        const typeMapping = getMessageTypeMapping();
        availableTypes.some( (type: MessageType) => {
            let innerMessage = undefined;
            try {
                const test: Message = typeMapping.get(type);
                console.log(test);
                //innerMessage = new (test)();
                foundMessage = innerMessage;
            }
            catch (err) {
                return false;
            }
            return true;
        });
        return foundMessage;
    } */
}