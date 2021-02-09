import type { WebServiceWrapper } from "./webServiceWrapper";
import type { OptionSelect } from '../main.d';

export class GameEventHandler {

    private _webApi: WebServiceWrapper;
    private _userKey: string;
    private _availableGameTypes: OptionSelect[];
    private _technicalNameRandom = 'default';

    public constructor(webApi: WebServiceWrapper, myUserKey: string, availableGameTypes: OptionSelect[]) {
        this._availableGameTypes = availableGameTypes;
        this._webApi = webApi;
        this._userKey = myUserKey;
    }

    public updateGameTypes(availableGameTypes: OptionSelect[]) {

        this._availableGameTypes = availableGameTypes;
    }

	public startGame = (event) => {
        let startGameType = event.detail;
		if (startGameType === this._technicalNameRandom && this._availableGameTypes.length > 0) {
			startGameType = this._availableGameTypes[Math.floor(Math.random() * (this._availableGameTypes.length - 1)) +1].technicalName;
		}
		if (this._availableGameTypes.length > 0 ) {
			this._webApi.startGame(this._userKey, startGameType);
		}
	}

	public subscribeGame = (event) => {
		let gameId = 2;
		if (event.type === 'observeGame') {
			gameId = event.detail;
		}
		this._webApi.subscribeGame(this._userKey, gameId);
	}

	public revealCell = (event) => {
		let column = -1;
		let row = -1;
		let currentGameId = -1;
		if (event.type === 'revealCell') {
			column = event.detail.column;
			row = event.detail.row;
			currentGameId = event.detail.gameId;
		} else {
			const currentGameBoard = {getWidth: () => {return 8}, getHeight: () => { return 8;}};
			column = Math.floor(Math.random() * currentGameBoard.getWidth())+1;
			row = Math.floor(Math.random() * currentGameBoard.getHeight())+1;
		}

		this._webApi.revealCell(this._userKey, currentGameId, column, row);
	}

	public revealSafeCell = (event) => {
		let column = -1;
		let row = -1;
		let currentGameId = -1;
		if (event.type === 'revealSafeCell') {
			currentGameId = event.detail.gameId;
			column = event.detail.column;
			row = event.detail.row;
		}
		if (column > -1 && row > -1){
			this._webApi.revealSafeCell(this._userKey, currentGameId, column, row);
		}
	}

	public toggleMark = (event) => {
		let column = -1;
		let row = -1;
		let currentGameId = -1;
		if (event.type === 'toggleMark') {
			currentGameId = event.detail.gameId;
			column = event.detail.column;
			row = event.detail.row;
		}
		this._webApi.toggleCell(this._userKey, currentGameId, column, row);
	}

}