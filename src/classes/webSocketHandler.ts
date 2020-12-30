import { MessageParser } from './messageParser';

export class WebSocketHandler {
    private webSocket: WebSocket;
    private messageParser: MessageParser;
    constructor(serverUrl: string) {
        this.webSocket = new WebSocket(serverUrl);
        this.messageParser = new MessageParser();
        this._registerEvents();

    };

    private _registerEvents() {
        const socketHandler = this;
		this.webSocket.addEventListener('message', function (event){
            let data;
			try {
				data = JSON.parse(event.data);
			} catch (exc) {
                console.log('no JSON data given!!')
                data.message = event.data;
            }
            socketHandler.messageParser.parse(data);
		});
    }
}