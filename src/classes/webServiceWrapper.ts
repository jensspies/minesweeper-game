import { MessageParser } from './messageParser';

export class WebServiceWrapper {
    private webApiUrl: string;
    private messageParser: MessageParser;

    constructor(serverUrl: string) {
        this.webApiUrl = serverUrl;
        this.messageParser = new MessageParser();

    };

    public async startGame(myId: string, gameType: string){
        const url = this._getGameStartUrl(myId, gameType);
        return this.callApi(url);
	}

	public async subscribeGame(myId: string, gameId: number) {
        const url = this._getGameSubscribeUrl(myId, gameId);
        return this.callApi(url);
	}

	public async updateGame(gameId: number) {
        const url = this._getGameUpdateUrl(gameId);
        return this.callApi(url);
	}

	public async getGameTypes() {
        const url = this._getGameTypesUrl();
        return this.callApi(url);
    }

    private async callApi(url: string) {
		await fetch(encodeURI(url), {mode: 'cors'})
			.then((response) => {
				return response.json();
			})
			.then(function(json) {
				this.messageParser.parse(json);
			});
    }

    private _getGameTypesUrl(): string {
        return this._getApiUrl() + '/gameTypes';
    }

    private _getGameUpdateUrl(gameId: number): string {
        return this._getApiUrl() + '/gameUpdate/' + gameId
    }

    private _getGameSubscribeUrl(myId: string, gameId: number): string {
        return this._getApiUrl() + '/subscribeGame/' + myId + '/' + gameId;
    }

    private _getGameStartUrl(myId: string, gameType: string): string {
        return this._getApiUrl() + '/start/' + myId + '/fullMatrixAdvanced';;
    }s

    private _getApiUrl(): string {
        return this.webApiUrl.replace(/\/*$/, '');
    }
}