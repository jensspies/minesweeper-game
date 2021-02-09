import { MessageHandler } from './messageHandler';

export class WebSocketHandler {
    private webSocket: WebSocket;
    private messageHandler: MessageHandler;
    constructor(serverUrl: string) {
        this.webSocket = new WebSocket(serverUrl);
        this.messageHandler = new MessageHandler();
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
            socketHandler.messageHandler.handleMessage(data);
		});
    }
}