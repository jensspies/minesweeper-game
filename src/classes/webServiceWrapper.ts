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

    public async revealCell(myId: string, currentGameId: number, column: number, row: number) {
        const url = this._getRevealCellUrl(myId, currentGameId, column, row);
        return this.callApi(url);
    }

    public async revealSafeCell(myId: string, currentGameId: number, column: number, row: number) {
        const url = this._getRevealSafeCellUrl(myId, currentGameId, column, row);
        return this.callApi(url);
    }

    public async toggleCell(myId: string,currentGameId: number,column: number,row: number) {
        const url = this._getToggleCellUrl(myId, currentGameId, column, row);
        return this.callApi(url);
    }

    public async getGameTypes() {
        const url = this._getGameTypesUrl();
        return this.callApi(url);
    }

	public async getRunningTypes() {
        const url = this._getRunningGamesUrl();
        return this.callApi(url);
    }

    public resetGames() {
        const url = this._getResetGamesUrl();
        return this.callApi(url);
    }

    private async callApi(url: string) {
        const apiHandler = this;
		await fetch(url, this.getFetchOptions())
        .then((response) => {
            return response.json();
        })
        .then(function(json) {
            apiHandler.messageParser.parse(json);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    private getFetchOptions(): RequestInit {
        return {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
    }

    private _getResetGamesUrl() {
        return this._getApiUrl() + '/resetGames';
    }

    private _getGameTypesUrl(): string {
        return this._getApiUrl() + '/gameTypes';
    }

    private _getGameUpdateUrl(gameId: number): string {
        return this._getApiUrl() + '/gameUpdate/' + gameId
    }

    private _getRevealCellUrl(myId: string, currentGameId: number, column: number, row: number) {
        return this._getApiUrl() + '/reveal/' + myId + '/' + currentGameId + '/' + column + '/' + row;
    }

    private _getRevealSafeCellUrl(myId: string, currentGameId: number, column: number, row: number) {
        return this._getApiUrl() + '/revealSafe/' + myId + '/' + currentGameId + '/' + column + '/' + row;
    }

    private _getToggleCellUrl(myId: string, currentGameId: number, column: number, row: number) {
        return this._getApiUrl() + '/toggle/' + myId + '/' + currentGameId + '/' + column + '/' + row;
    }

    private _getGameSubscribeUrl(myId: string, gameId: number): string {
        return this._getApiUrl() + '/subscribeGame/' + myId + '/' + gameId;
    }

    private _getGameStartUrl(myId: string, gameType: string): string {
        return this._getApiUrl() + '/start/' + myId + '/' + gameType;
    }

    private _getRunningGamesUrl() {
        return this._getApiUrl() + '/runningGames';
    }

    private uriEncodeId(id: string): string {
        return encodeURI(id);
    }
    private _getApiUrl(): string {
        return this.webApiUrl.replace(/\/*$/, '');
    }
}