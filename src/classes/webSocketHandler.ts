import { myWebsocketId, messageQueue } from '../store';

export class WebSocketHandler {
    private webSocket: WebSocket;

    constructor(serverUrl: string) {
        this.webSocket = new WebSocket(serverUrl);
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
            } 
            if (data.welcome) {
                myWebsocketId.set(data.welcome);
            } else {
				messageQueue.add(data.message);
			}
		});
    }
}