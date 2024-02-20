import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:8000',
    },
})
export class GameGateway implements OnGatewayConnection {
    nb: number = 0;
    private logger: Logger = new Logger('GameGateway');

    @WebSocketServer()
    server: Server;
    playerQueue: { socket: Socket }[] = [];
    playerQueueUser: { socket: Socket }[] = [];
    listClient: { id: string; socket: Socket; wishPlayer: string }[] = [];
    listRooms: Map<string, string> = new Map<string, string>();
    playerScore: Map<string, number> = new Map<string, number>();
    

    players = {

    };
    roomName: string = '';
    clientNO: number = 0;
    clientNOForCard: number = 0;
    numClients = {};

    handleConnection(socket: Socket): any {
        this.logger.log(`Client connected: ${socket.id}`);
    }

    @SubscribeMessage('firstTime')
    handleFirstTime(socket: Socket, data: any) {
        socket.data.user = data;
        socket.join(data.providerId);
    }

    @SubscribeMessage('someevent')
    handleSomeEvent(socket: Socket, data: any) {
        data = 'data';
        this.server.emit('someevent', data);
    }


    @SubscribeMessage('joinRoom')
    handleJoinRoom(socket: Socket, data: any) {
        this.clientNO++;
        // this.roomName = `game-${Math.round(this.clientNO / 2).toString()}`;
        this.roomName = data.roomName;
        if (this.clientNO % 2)
            this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player1' });
        else
            this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player2' });

        socket.join(this.roomName);
        this.listRooms.set(socket.id, this.roomName);
        this.playerScore.set(socket.id, 0);
        if (this.numClients[this.roomName] == undefined) {
            this.numClients[this.roomName] = 1;
        }
        else {
            this.numClients[this.roomName]++;
        }
        this.server.in(socket.id).emit('enterRoom', { roomName: this.roomName, wishPlayer: this.listClient[this.listClient.length - 1].wishPlayer });

        if (this.numClients[this.roomName] == 2) {
            const initialVelocityX = Math.random() * 600 + 200;
            const initialVelocityY = Math.random() * 600 + 200;
            setTimeout(() => {
                this.server.in(this.roomName).emit('bothInRoom', { roomName: this.roomName, initialVelocityX: initialVelocityX, initialVelocityY: initialVelocityY });
            }, 3000);
        }
    }

    @SubscribeMessage('joinRoomFromCard')
    handleJoinRoomFromCard(socket: Socket, data: any) {
        this.playerQueue.push({ socket: socket });
        if (this.playerQueue.length >= 2) {
            this.clientNOForCard++;
            const roomName = `gameCard-${this.clientNOForCard}`;

            const player1 = this.playerQueue.shift();
            const player2 = this.playerQueue.shift();
            this.listRooms.set(player1.socket.id, roomName);
            this.listRooms.set(player2.socket.id, roomName);
            console.log('list of rooms in the server **:', this.listRooms);
            player1.socket.join(roomName);
            player2.socket.join(roomName);
            this.server.in(roomName).emit('enterRoomFromCard', { roomName });
        }
    }


    handleDisconnect(socket: Socket) {
        const roomName = this.listRooms.get(socket.id);
        this.playerQueue = this.playerQueue.filter((player) => player.socket.id !== socket.id);
        this.server.to(roomName).emit('OnePlayerLeaveTheRoom', { roomName });
        // socket.removeAllListeners();
        // socket.broadcast.to(this.roomName).emit('OnePlayerLeaveTheRoom', { roomName: data.roomName });
        // socket.leave(this.roomName);
        this.logger.log(`Client disconnected1: ${socket.id}`);

        this.server.socketsLeave(roomName);
    }

    @SubscribeMessage('customDisconnectClient')
    handleCustomDisconnect(socket: Socket, data: any) {
        if (!data.roomName) return;
        console.log('how send the event 555', socket.id);

        this.playerQueue = this.playerQueue.filter((player) => player.socket.id !== socket.id);
        this.server.to(data.roomName).emit('OnePlayerLeaveTheRoom', { roomName: data.roomName });
        // socket.removeAllListeners();
        // socket.broadcast.to(data.roomName).emit('OnePlayerLeaveTheRoom', { roomName: data.roomName });
        this.logger.log(`Client disconnected2: ${socket.id}`);
        console.log('the room name is  666', data.roomName);

        // socket.leave(data.roomName);
        this.server.socketsLeave(data.roomName);

    }

    @SubscribeMessage('goalScored')
    handleGoalScored(socket: Socket, data: any) {
        this.playerScore.set(socket.id, this.playerScore.get(socket.id) + 1);
        const roomName = this.listRooms.get(socket.id);
        if (this.playerScore.get(socket.id) < 5) {
            const initialVelocityX = Math.random() * 600 + 200;
            const initialVelocityY = Math.random() * 600 + 200;
            setTimeout(() => {
                this.server.in(roomName).emit('bothInRoom', { roomName: roomName, initialVelocityX: initialVelocityX, initialVelocityY: initialVelocityY });
            }, 2000);
        }
        else if (this.playerScore.get(socket.id) == 5) {
            this.server.in(roomName).emit('gameOver');
        }

    }

    @SubscribeMessage('replayClient')
    handleReplayClient(socket: Socket, data: any) {
        console.log('the game is over', data);
        socket.emit('replayServer', data);
        // this.server.in(data.roomName).emit('replayServer', data);
    }
    
    @SubscribeMessage('checkRoom')
    handleCheckRoom(socket: Socket, data: any) {
        if(!socket.rooms.has(data.roomName)) 
        {
            socket.emit('youAreNotinRoom');
        }
    }



    @SubscribeMessage('startGameClient')
    handleStartGameClinet(socket: Socket, data: any) {
        if (this.numClients[data.roomName] == 2) {
            const initialVelocityX = Math.random() * 600 + 200;
            const initialVelocityY = Math.random() * 600 + 200;
            this.server.to(data.roomName).emit('startGameServer', { roomName: data.roomName, initialVelocityX: initialVelocityX, initialVelocityY: initialVelocityY });
        }
    }

    @SubscribeMessage('startBall')
    handleStartBall(socket: Socket, data: any) {
        this.server.to(data.roomName).emit('startBallBack', data);
    }

    @SubscribeMessage('setScore')
    handleSetScore(socket: Socket, data: any) {
        this.server.to(data.roomName).emit('setScoreBack', data);
    }

    @SubscribeMessage('move')
    handleMove(socket: Socket, data: any): void {
        this.server.to(data.roomName).emit('moveback', data);
    }
}
