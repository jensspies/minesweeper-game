import { Message, MessageType } from './message';
import { ChatMessage } from './messages/chatMessage';
import { GameIdMessage } from './messages/gameId';
import { GameStatusMessage } from './messages/gameStatus';
import { GameTypesMessage } from './messages/gameTypes';
import { RunningGamesMessage } from './messages/runningGames';
import { WelcomeMessage } from './messages/welcome';

export class MessageParser {
    constructor() {

    };

    parse(data: any): any {

        const message: any = this.getMessageObject(data);
        if(!message && Object.keys(data).length > 0) {
            console.log('MessageType not registered:');
            console.log(data);
        }
        return message;
    }

    private getMessageObject(data): Message|undefined {
        let foundMessage = this.getMessageObjectStatic(data);
        return foundMessage;
    }

    private getMessageObjectStatic(data): Message|undefined {
        let foundMessage: Message = undefined;

        if (data && data.type) {
            switch (data.type) {
                case MessageType.GameTypes:
                    foundMessage = new GameTypesMessage(data);
                    break;
                case MessageType.OpenGames:
                    foundMessage = new RunningGamesMessage(data);
                    break;
                case MessageType.GameStatus:
                    foundMessage = new GameStatusMessage(data);
                    break;
            }
        }

        if (data.welcome) {
            foundMessage = new WelcomeMessage(data);
        }
        if (data.message) {
            foundMessage = new ChatMessage(data);
        }
        if (data.gameId && !data.timestamp) {
            foundMessage = new GameIdMessage(data);
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