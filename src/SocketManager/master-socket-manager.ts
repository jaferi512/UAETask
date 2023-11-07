import SocketIOClient from 'socket.io-client';
import * as SocketActions from './socket-actions';

const url = 'http://15.235.162.99:5010';

export default class MasterSocketsManager {
	static instance = null;

	constructor() {
		this.socket = null;
	}

	static getInstance() {
		if (MasterSocketsManager.instance == null) {
			MasterSocketsManager.instance = new MasterSocketsManager();
		}
		return this.instance;
	}

	connect = (callback) => {
		this.socket = SocketIOClient(url, { transports: ["websocket"] });

		this.socket.on(SocketActions.CONNECT, () => {
			this.socket.emit(SocketActions.SUBSCRIBE);
		});

		this.socket.on(SocketActions.STOP_CLIENT, () => {
			if (callback) {
				callback(SocketActions.STOP_CLIENT, {});
			}
		});

		this.socket.on(SocketActions.DISCONNECT, () => {
			console.log('Slave Socket Disconnected');
		});
	}

	disconnect = () => {
		if (this.socket && this.socket.connected) {
			this.socket.disconnect();
		}
	}
}
