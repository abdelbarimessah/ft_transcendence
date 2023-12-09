import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { subscribe } from 'diagnostics_channel';

@WebSocketGateway({ 
    cors: {
        origin: 'http://localhost:8000',
    },
})
export class GameGateway implements OnGatewayInit, OnGatewayDisconnect, OnModuleInit {

    private logger: Logger = new Logger('GameGateway');

    @WebSocketServer()
    server: Server;

    players = {
    };

    onModuleInit() {
        this.server.on('connection', (socket: Socket) => {
            this.logger.log(`Client connected: ${socket.id}`);
            // this.players[socket.id] = {
            //     x: 0,
            //     y: 0,
            // };
            // this.logger.log(`Players: ${JSON.stringify(this.players)}`);
            // let size = Object.keys(this.players).length;
            // console.log(size);
            // this.server.emit('startGame', this.players);
        });
    }
    
    @SubscribeMessage('onMessage')
    onMessage(@MessageBody() body: any) {
        this.logger.log(`Client message: ${body}`);
        this.server.emit('onMessage', body);
    }
    
    afterInit(server: any) {
        this.logger.log('the Game Initialized!');
    }

    // handleConnection(client: any, ...args: any[]) {
    //     this.logger.log(`Client connected: ${client.id}`);
    // }
    
    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        console.log('message from the client to the server!');
        this.logger.log(`Client message: ${payload}`);
    }
    
    @SubscribeMessage('move')
    handleMove(socket: Socket, data: any): void {
        console.log("Received move event with data:", data);
        this.logger.log(`Client move: ${data.p1Y}`);
        this.players[socket.id] = {
            y: data.p1Y,
        };
        this.server.emit('moveback', this.players);
    }
}
