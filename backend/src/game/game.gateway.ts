import {OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ 
    cors: {
        origin: 'http://localhost:8000',
    },
})
export class GameGateway implements OnGatewayConnection {
    nb : number = 0;
    private logger: Logger = new Logger('GameGateway');
    
    @WebSocketServer()
    server: Server;
    playerQueue: {name: string; socket: Socket}[] = [];
    listClient: {id: string; socket: Socket; wishPlayer:string}[] = [];
    listRooms: {socket: Socket; id:string}[] = [];
    
    players = {
    };
    roomName: string = '';
    clientNO: number = 0;
    numClients = {};

    handleConnection(socket: Socket): any
    {
        this.logger.log(`Client connected: ${socket.id}`);
    }
    handleDisconnect(socket: Socket) {
        this.logger.log(`Client disconnected: ${socket.id}`);
        this.listClient = this.listClient.filter((client) => client.id !== socket.id);
        this.listRooms = this.listRooms.filter((room) => room.socket.id !== socket.id);
        this.server.to(this.roomName).emit('leaveRoom', {roomName: this.roomName});
        socket.leave(this.roomName);
        this.numClients[this.roomName]--;
    }
    
    @SubscribeMessage('joinRoom')
    handleJoinRoom(socket: Socket) {
        this.clientNO++;
        this.roomName = Math.round(this.clientNO/2).toString()
        if(this.clientNO % 2)
            this.listClient.push({id: socket.id, socket: socket, wishPlayer: 'player1'});
        else 
            this.listClient.push({id: socket.id, socket: socket, wishPlayer: 'player2'});
        
        this.logger.log(`join to the room : ` + this.roomName);
        socket.join(this.roomName);
        this.listRooms.push({socket: socket, id: this.roomName});
        if(this.numClients[this.roomName] == undefined) {
            this.numClients[this.roomName] = 1;
            this.logger.log('player 1 in the room : ' + this.roomName);
        }
        else {
            this.numClients[this.roomName]++;
            this.logger.log('player 2 in the room : ' + this.roomName);
        }
        this.logger.log('number of client in the room in the connect: ' + this.roomName + ' : ' + this.numClients[this.roomName]);
        this.server.in(socket.id).emit('enterRoom', {roomName: this.roomName, wishPlayer: this.listClient[this.listClient.length-1].wishPlayer});
    }

    @SubscribeMessage('replayClient')
    handleReplayClient(socket: Socket, data: any) {
        this.logger.log('replayClient');
        this.server.to(data.roomName).emit('replayServer', data);
    }


    @SubscribeMessage('startGameClinet')
    handleStartGameClinet(socket: Socket, data: any) {
        if(this.numClients[data.roomName] == 2) {
            this.server.to(data.roomName).emit('startGameServer', data);
        }
        else
            this.logger.log('the number of client in the room is not 2 but is => ' + this.numClients[data.roomName] + "||" + data.roomName);
    }
    
    @SubscribeMessage('startBall')
    handleStartBall(socket: Socket, data: any) {
        this.logger.log('start ball');
        this.server.to(data.roomName).emit('startBallBack', data);
    }

    @SubscribeMessage('move')
    handleMove(socket: Socket, data: any): void {
        this.server.to(data.roomName).emit('moveback', data);
    }
}
