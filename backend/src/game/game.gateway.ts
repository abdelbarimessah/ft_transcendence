import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
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
    playerQueue: {id: string; socket: Socket}[] = [];
    listClient: {id: string; socket: Socket}[] = [];
    listRooms: {socket: Socket; id:string}[] = [];
    
    players = {
    };
    roomName: string;
    clientNO: number = 0;
    numClients = {};
    
    handleConnection(socket: Socket): any
    {
        this.logger.log(`Client connected: ${socket.id}`);
    }
    @SubscribeMessage('joinRoom')
    handleJoinRoom(socket: Socket) {
        this.clientNO++;
        this.roomName = Math.round(this.clientNO/2).toString()
        this.logger.log(`join to the room : ` + this.roomName);
        socket.join(this.roomName);
        this.listRooms.push({socket: socket, id: this.roomName});
        if(this.numClients[this.roomName] == undefined) {
            this.numClients[this.roomName] = 1;
        }
        else {
            this.numClients[this.roomName]++;
        }
        this.logger.log('number of client in the room in the connect: ' + this.roomName + ' : ' + this.numClients[this.roomName]);
        this.server.in(socket.id).emit('enterRoom', this.roomName);
    }

    handleDisconnect(socket: Socket) {
        this.logger.log(`Client disconnected: ${socket.id}`);
        socket.leave(this.listRooms[socket.id]);
        this.numClients[this.listRooms[socket.id]]--;
        this.logger.log('number of client in the room after disconnect: |' + this.listRooms[socket.id] + '| : ' + this.numClients[this.listRooms[socket.id]]);
    }

    @SubscribeMessage('move')
    handleMove(socket: Socket, data: any): void {
        this.server.to(data.roomName).emit('moveback', data);
    }
}
