import { MessageType } from "./message";
import { MessageParser } from "./messageParser";
import { myWebsocketId, chatMessageQueue, myCurrentGameId, gameStatusMessageQueue, availableTypes, openGamesToObserveQueue } from '../store';

export class MessageHandler {
    private messageParser: MessageParser;
    constructor() {
        this.messageParser = new MessageParser();
    };


    handleMessage = (data) => {

        const message = this.messageParser.parse(data);
        switch (message.getType()) {
            case MessageType.WelcomeMessage:
                myWebsocketId.init(message);
                break;
            case MessageType.ChatMessage:
                chatMessageQueue.add(message);
                break;
            case MessageType.GameTypes:
                availableTypes.set(message.data);
                break;
            case MessageType.GameId:
                myCurrentGameId.init(message);
                break;
            case MessageType.GameStatus:
                gameStatusMessageQueue.add(message);
                break;
            case MessageType.OpenGames:
                openGamesToObserveQueue.add(message);
                break;
        }
    }
}