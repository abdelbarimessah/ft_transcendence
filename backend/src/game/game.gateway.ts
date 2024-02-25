import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8000', 'http://localhost:8000/'],
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  nb: number = 0;
  private logger: Logger = new Logger('GameGateway');
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server: Server;
  playerQueue: { socket: Socket }[] = [];
  playerQueueUser: { socketName: string }[] = [];
  listClient: { id: string; socket: Socket; wishPlayer: string }[] = [];
  listRooms: Map<string, string> = new Map<string, string>();
  playerScore: Map<string, number> = new Map<string, number>();
  private roomSockets = new Map<string, { player1: any; player2: any }>();

  players = {};
  roomName: string = '';
  clientNO: number = 0;
  clientNOForCard: number = 0;
  numClients = {};

  private readonly connectedClients: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): any {
    this.logger.log(`Client connected: ${socket.id}`);
  }

  @SubscribeMessage('firstTime')
  handleFirstTime(socket: Socket, data: any) {
    console.log(`${data.nickName} joined ${data.providerId}`);
    socket.data.user = data;
    socket.join(data.providerId);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data: any) {
    this.clientNO++;
    this.roomName = data.roomName;
    if (this.clientNO % 2)
      this.listClient.push({
        id: socket.id,
        socket: socket,
        wishPlayer: 'player1',
      });
    else
      this.listClient.push({
        id: socket.id,
        socket: socket,
        wishPlayer: 'player2',
      });
    socket.join(this.roomName);
    this.listRooms.set(socket.id, this.roomName);
    this.playerScore.set(socket.id, 0);
    if (this.numClients[this.roomName] == undefined) {
      this.numClients[this.roomName] = 1;
    } else {
      this.numClients[this.roomName]++;
    }
    this.server.in(socket.id).emit('enterRoom', {
      roomName: this.roomName,
      wishPlayer: this.listClient[this.listClient.length - 1].wishPlayer,
    });

    if (this.numClients[this.roomName] == 2) {
      const initialVelocityX = Math.random() * 600 + 200;
      const initialVelocityY = Math.random() * 600 + 200;
      setTimeout(() => {
        this.server.in(this.roomName).emit('bothInRoom', {
          roomName: this.roomName,
          initialVelocityX: initialVelocityX,
          initialVelocityY: initialVelocityY,
        });
      }, 3000);
    }
  }

  @SubscribeMessage('joinRoomFromCard')
  handleJoinRoomFromCard(socket: Socket, data: any) {
    this.playerQueue.push({ socket: socket });
    this.playerQueueUser.push({ socketName: socket.id });
    if (this.playerQueue.length >= 2) {
      this.clientNOForCard++;
      const roomName = `gameCard-${this.clientNOForCard}`;
      const player1 = this.playerQueue.shift();
      const player2 = this.playerQueue.shift();
      const id1 = this.playerQueueUser.shift();
      const id2 = this.playerQueueUser.shift();

      this.listRooms.set(player1.socket.id, roomName);
      this.listRooms.set(player2.socket.id, roomName);
      player1.socket.join(roomName);
      player2.socket.join(roomName);
      player1.socket.emit('yourOpponent', player2.socket.data.user);
      player2.socket.emit('yourOpponent', player1.socket.data.user);
      this.server.in(roomName).emit('enterRoomFromCard', {
        roomName,
        player1: player1.socket.data.user,
        player2: player2.socket.data.user,
      });
      this.roomSockets.set(roomName, {
        player1: player1.socket.data.user,
        player2: player2.socket.data.user,
      });
    }
  }

  @SubscribeMessage('endGame')
  async handleEndGame(socket: Socket, data: any) {
    const roomName = data.gameData.roomName;
    const sockets = this.roomSockets.get(roomName);

    if (socket.data.user.providerId === sockets.player1.providerId) {
      socket.emit('endGameClient', {
        roomName: roomName,
        game: data.gameData,
        user: socket.data.user,
        oponent: sockets.player2,
      });
    } else {
      socket.emit('endGameClient', {
        roomName: roomName,
        game: data.gameData,
        user: socket.data.user,
        oponent: sockets.player1,
      });
    }
  }
  @SubscribeMessage('customDisconnectClient')
  handleCustomDisconnect(socket: Socket, data: any) {
    console.log('the custom disconnect in the gateway [333333]', data.roomName);

    if (!data.roomName) return;
    this.playerQueue = this.playerQueue.filter(
      (player) => player.socket.id !== socket.id,
    );
    this.playerQueueUser = this.playerQueueUser.filter(
      (player) => player.socketName !== socket.id,
    );
    const roomName = data.roomName;
    const sockets = this.roomSockets.get(roomName);
    this.server.to(data.roomName).emit('OnePlayerLeaveTheRoom', {
      roomName: data.roomName,
      user: sockets.player1,
      oponent: sockets.player2,
      socketId: socket.id,
    });

    this.connectedClients.delete(socket.id);
    this.server.socketsLeave(data.roomName);
  }

  handleDisconnect(socket: Socket) {
    const roomName = this.listRooms.get(socket.id);
    this.playerQueue = this.playerQueue.filter(
      (player) => player.socket.id !== socket.id,
    );
    this.playerQueueUser = this.playerQueueUser.filter(
      (player) => player.socketName !== socket.id,
    );
    this.server.to(roomName).emit('OnePlayerLeaveTheRoom', { roomName });
    this.connectedClients.delete(socket.id);
    this.server.socketsLeave(roomName);
  }

  @SubscribeMessage('handleRemoveFromQueue')
  handleHandleRemoveFromQueue(socket: Socket) {
    this.playerQueue = this.playerQueue.filter(
      (player) => player.socket.id !== socket.id,
    );
    this.playerQueueUser = this.playerQueueUser.filter(
      (player) => player.socketName !== socket.id,
    );
  }

  @SubscribeMessage('goalScored')
  handleGoalScored(socket: Socket, data: any) {
    this.playerScore.set(socket.id, this.playerScore.get(socket.id) + 1);
    const roomName = this.listRooms.get(socket.id);
    if (this.playerScore.get(socket.id) < 5) {
      const initialVelocityX = Math.random() * 600 + 200;
      const initialVelocityY = Math.random() * 600 + 200;
      setTimeout(() => {
        this.server.in(roomName).emit('bothInRoom', {
          roomName: roomName,
          initialVelocityX: initialVelocityX,
          initialVelocityY: initialVelocityY,
        });
      }, 2000);
    } else if (this.playerScore.get(socket.id) == 5) {
      this.server.in(roomName).emit('gameOver');
    }
  }

  @SubscribeMessage('checkRoom')
  handleCheckRoom(socket: Socket, data: any) {
    if (socket.rooms.has(data.roomName) === false)
      socket.emit('youAreNotinRoom');
  }

  @SubscribeMessage('startGameClient')
  handleStartGameClinet(socket: Socket, data: any) {
    if (this.numClients[data.roomName] == 2) {
      const initialVelocityX = Math.random() * 600 + 200;
      const initialVelocityY = Math.random() * 600 + 200;
      this.server.to(data.roomName).emit('startGameServer', {
        roomName: data.roomName,
        initialVelocityX: initialVelocityX,
        initialVelocityY: initialVelocityY,
      });
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
// import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Logger } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway({
//     cors: {
//         origin: 'http://localhost:8000/',
//     },
// })
// export class GameGateway implements OnGatewayConnection {
//     nb: number = 0;
//     private logger: Logger = new Logger('GameGateway');

//     @WebSocketServer()
//     server: Server;
//     playerQueue: { socket: Socket }[] = [];
//     playerQueueUser: { socket: Socket }[] = [];
//     listClient: { id: string; socket: Socket; wishPlayer: string }[] = [];
//     listRooms: Map<string, string> = new Map<string, string>();
//     playerScore: Map<string, number> = new Map<string, number>();

//     players = {

//     };
//     roomName: string = '';
//     clientNO: number = 0;
//     clientNOForCard: number = 0;
//     numClients = {};

//     handleConnection(socket: Socket): any {
//         this.logger.log(`Client connected: ${socket.id}`);
//     }

//     @SubscribeMessage('firstTime')
//     handleFirstTime(socket: Socket, data: any) {
//         socket.data.user = data;
//         socket.join(data.providerId);
//     }

//     @SubscribeMessage('joinRoom')
//     handleJoinRoom(socket: Socket, data: any) {
//         this.clientNO++;
//         this.roomName = data.roomName;
//         if (this.clientNO % 2)
//             this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player1' });
//         else
//             this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player2' });

//         socket.join(this.roomName);
//         this.listRooms.set(socket.id, this.roomName);
//         this.playerScore.set(socket.id, 0);
//         if (this.numClients[this.roomName] == undefined) {
//             this.numClients[this.roomName] = 1;
//         }
//         else {
//             this.numClients[this.roomName]++;
//         }
//         this.server.in(socket.id).emit('enterRoom', { roomName: this.roomName, wishPlayer: this.listClient[this.listClient.length - 1].wishPlayer });

//         if (this.numClients[this.roomName] == 2) {
//             const initialVelocityX = Math.random() * 600 + 200;
//             const initialVelocityY = Math.random() * 600 + 200;
//             setTimeout(() => {
//                 this.server.in(this.roomName).emit('bothInRoom', { roomName: this.roomName, initialVelocityX: initialVelocityX, initialVelocityY: initialVelocityY });
//             }, 3000);
//         }
//     }

//     @SubscribeMessage('joinRoomFromCard')
//     handleJoinRoomFromCard(socket: Socket, data: any) {
//         this.playerQueue.push({ socket: socket });
//         if (this.playerQueue.length >= 2) {
//             this.clientNOForCard++;
//             const roomName = `gameCard-${this.clientNOForCard}`;
//             const player1 = this.playerQueue.shift();
//             const player2 = this.playerQueue.shift();
//             this.listRooms.set(player1.socket.id, roomName);
//             this.listRooms.set(player2.socket.id, roomName);
//             player1.socket.join(roomName);
//             player2.socket.join(roomName);
//             player1.socket.emit('yourOpponent', player2.socket.data.user)
//             player2.socket.emit('yourOpponent', player1.socket.data.user)
//             this.server.in(roomName).emit('enterRoomFromCard', { roomName });
//         }
//     }

//     handleDisconnect(socket: Socket) {
//         const roomName = this.listRooms.get(socket.id);
//         this.playerQueue = this.playerQueue.filter((player) => player.socket.id !== socket.id);
//         this.server.to(roomName).emit('OnePlayerLeaveTheRoom', { roomName });
//         this.logger.log(`Client disconnected1: ${socket.id}`);
//         this.server.socketsLeave(roomName);
//     }

//     @SubscribeMessage('customDisconnectClient')
//     handleCustomDisconnect(socket: Socket, data: any) {
//         console.log('im in the disconnect 333333', data);
//         if (!data.roomName) return;
//         this.playerQueue = this.playerQueue.filter((player) => player.socket.id !== socket.id);
//         this.server.to(data.roomName).emit('OnePlayerLeaveTheRoom', { roomName: data.roomName });
//         this.logger.log(`Client disconnected2: ${socket.id}`);
//         console.log(socket.id, 'the list of the rooms of this socket is 1', socket.rooms);
//         socket.leave(data.roomName);
//         this.server.socketsLeave(data.roomName);
//         console.log(socket.id, 'the list of the rooms of this socket is 2', socket.rooms);
//     }
//     @SubscribeMessage('handleRemoveFromQueue')
//     handleHandleRemoveFromQueue(socket: Socket) {
//         console.log('im in the disconnect 333333');
//         console.log('player queueis 00000',this.playerQueue)
//         console.log(socket.id, 'the list of the rooms of this socket is 2', socket.rooms);
//     }

//     @SubscribeMessage('goalScored')
//     handleGoalScored(socket: Socket, data: any) {
//         this.playerScore.set(socket.id, this.playerScore.get(socket.id) + 1);
//         const roomName = this.listRooms.get(socket.id);
//         if (this.playerScore.get(socket.id) < 5) {
//             const initialVelocityX = Math.random() * 600 + 200;
//             const initialVelocityY = Math.random() * 600 + 200;
//             setTimeout(() => {
//                 this.server.in(roomName).emit('bothInRoom', { roomName: roomName, initialVelocityX: initialVelocityX, initialVelocityY: initialVelocityY });
//             }, 2000);
//         }
//         else if (this.playerScore.get(socket.id) == 5) {
//             this.server.in(roomName).emit('gameOver');
//         }

//     }

//     @SubscribeMessage('endGame')
//     handleEndGame(socket: Socket, data: any) {
//         console.log('the game is over', data);
//         socket.emit('endGameClient', {game:data, socketData: socket.data.user});
//     }

//     @SubscribeMessage('checkRoom')
//     handleCheckRoom(socket: Socket, data: any) {
//         if(socket.rooms.has(data.roomName) === false) socket.emit('youAreNotinRoom');
//     }

//     @SubscribeMessage('startGameClient')
//     handleStartGameClinet(socket: Socket, data: any) {
//         if (this.numClients[data.roomName] == 2) {
//             const initialVelocityX = Math.random() * 600 + 200;
//             const initialVelocityY = Math.random() * 600 + 200;
//             this.server.to(data.roomName).emit('startGameServer', { roomName: data.roomName, initialVelocityX: initialVelocityX, initialVelocityY: initialVelocityY });
//         }
//     }

//     @SubscribeMessage('startBall')
//     handleStartBall(socket: Socket, data: any) {
//         this.server.to(data.roomName).emit('startBallBack', data);
//     }

//     @SubscribeMessage('setScore')
//     handleSetScore(socket: Socket, data: any) {
//         this.server.to(data.roomName).emit('setScoreBack', data);
//     }

//     @SubscribeMessage('move')
//     handleMove(socket: Socket, data: any): void {
//         this.server.to(data.roomName).emit('moveback', data);
//     }
// }
