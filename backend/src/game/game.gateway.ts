import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8000',
  },
  cors: {
    origin: 'http://localhost:8000',
  },
})
export class GameGateway implements OnGatewayConnection {
  nb: number = 0;
  private logger: Logger = new Logger('GameGateway');
  nb: number = 0;
  private logger: Logger = new Logger('GameGateway');

  @WebSocketServer()
  server: Server;
  playerQueue: { socket: Socket }[] = [];
  listClient: { id: string; socket: Socket; wishPlayer: string }[] = [];
  listRooms: Map<string, string> = new Map<string, string>();
  playerScore: Map<string, number> = new Map<string, number>();
  @WebSocketServer()
  server: Server;
  playerQueue: { socket: Socket }[] = [];
  listClient: { id: string; socket: Socket; wishPlayer: string }[] = [];
  listRooms: Map<string, string> = new Map<string, string>();
  playerScore: Map<string, number> = new Map<string, number>();

  players = {};
  roomName: string = '';
  clientNO: number = 0;
  clientNOForCard: number = 0;
  numClients = {};
  players = {};
  roomName: string = '';
  clientNO: number = 0;
  clientNOForCard: number = 0;
  numClients = {};

  handleConnection(socket: Socket): any {
    this.logger.log(`Client connected: ${socket.id}`);
  }

  @SubscribeMessage('firstTime')
  handleFirstTime(socket: Socket, data: any) {
    this.logger.log('firstTime', data);
    // this.server.emit('firstTime', data);
    socket.join(data);
    this.server.in(data).emit('bothInRoom', data);
  }

  handleDisconnect(socket: Socket) {
    this.roomName = this.listRooms.get(socket.id);
    this.logger.log(this.listRooms.get(socket.id));
    this.logger.log('room name in the disconnect: ' + this.roomName);
    this.logger.log(`Client disconnected: ${socket.id}`);
    this.server
      .to(this.roomName)
      .emit('leaveRoom', { roomName: this.roomName });
    socket.leave(this.roomName);
    this.numClients[this.roomName]--;

    this.playerQueue = this.playerQueue.filter(
      (player) => player.socket.id !== socket.id,
    );
    this.logger.log(this.playerQueue.length + ' queue length after disconnect');
  }

  @SubscribeMessage('someevent')
  handleSomeEvent(socket: Socket, data: any) {
    this.logger.log('someevent');
    data = 'data';
    this.server.emit('someevent', data);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket) {
    this.clientNO++;
    this.roomName = `game-${Math.round(this.clientNO / 2).toString()}`;
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

    this.logger.log(`join to the room : ` + this.roomName);
    socket.join(this.roomName);
    this.listRooms.set(socket.id, this.roomName);
    this.playerScore.set(socket.id, 0);
    if (this.numClients[this.roomName] == undefined) {
      this.numClients[this.roomName] = 1;
      this.logger.log('player 1 in the room : ' + this.roomName);
    } else {
      this.numClients[this.roomName]++;
      this.logger.log('player 2 in the room : ' + this.roomName);
    }
    this.logger.log(
      'number of client in the room in the connect: ' +
        this.roomName +
        ' : ' +
        this.numClients[this.roomName],
    );
    this.server.in(socket.id).emit('enterRoom', {
      roomName: this.roomName,
      wishPlayer: this.listClient[this.listClient.length - 1].wishPlayer,
    });
    this.logger.log(`join to the room : ` + this.roomName);
    socket.join(this.roomName);
    this.listRooms.set(socket.id, this.roomName);
    this.playerScore.set(socket.id, 0);
    if (this.numClients[this.roomName] == undefined) {
      this.numClients[this.roomName] = 1;
      this.logger.log('player 1 in the room : ' + this.roomName);
    } else {
      this.numClients[this.roomName]++;
      this.logger.log('player 2 in the room : ' + this.roomName);
    }
    this.logger.log(
      'number of client in the room in the connect: ' +
        this.roomName +
        ' : ' +
        this.numClients[this.roomName],
    );
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

  @SubscribeMessage('customDisconnectClient')
  handleCustomDisconnect(socket: Socket, data: any) {
    // this.roomName = this.listRooms.get(socket.id);
    // this.logger.log(this.listRooms.get(socket.id))
    // this.logger.log('room name in the disconnect: ' + this.roomName);
    // this.logger.log(`Client disconnected: ${socket.id}`);
    // this.server.to(this.roomName).emit('leaveRoom', { roomName: this.roomName });
    // socket.leave(this.roomName);
    // this.numClients[this.roomName]--;
    // socket.disconnect(true);
    // this.logger.log('customDisconnectClient');
    this.playerQueue = this.playerQueue.filter(
      (player) => player.socket.id !== socket.id,
    );
    this.logger.log(
      this.playerQueue.length + ' queue length after quit the game mode',
    );
  }

  @SubscribeMessage('joinRoomFromCard')
  handleJoinRoomFromCard(socket: Socket, data: any) {
    this.clientNOForCard++;
    this.playerQueue.push({ socket: socket });
    this.logger.log(this.playerQueue.length + ' queue length');
    this.logger.log('befor enter the queue');
    if (this.playerQueue.length == 2) {
      this.roomName = `gameCard-${Math.round(
        this.clientNOForCard / 2,
      ).toString()}`;
      for (let i = 0; i < 2; i++) {
        this.playerQueue[i].socket.join(this.roomName);
      }
      this.server
        .in(this.roomName)
        .emit('enterRoomFromCard', { roomName: this.roomName });
      this.playerQueue.shift();
      this.playerQueue.shift();
    }
  }
  // @SubscribeMessage('joinRoomFromCard')
  // handleJoinRoomFromCard(socket: Socket, data: any) {
  //     this.clientNOForCard++;
  //     this.roomName = `gameCard-${Math.round(this.clientNOForCard / 2).toString()}`;
  //     if (this.clientNOForCard % 2)
  //         this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player1' });
  //     else
  //         this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player2' });
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

  @SubscribeMessage('customDisconnectClient')
  handleCustomDisconnect(socket: Socket, data: any) {
    // this.roomName = this.listRooms.get(socket.id);
    // this.logger.log(this.listRooms.get(socket.id))
    // this.logger.log('room name in the disconnect: ' + this.roomName);
    // this.logger.log(`Client disconnected: ${socket.id}`);
    // this.server.to(this.roomName).emit('leaveRoom', { roomName: this.roomName });
    // socket.leave(this.roomName);
    // this.numClients[this.roomName]--;
    // socket.disconnect(true);
    // this.logger.log('customDisconnectClient');
    this.playerQueue = this.playerQueue.filter(
      (player) => player.socket.id !== socket.id,
    );
    this.logger.log(
      this.playerQueue.length + ' queue length after quit the game mode',
    );
  }

  @SubscribeMessage('joinRoomFromCard')
  handleJoinRoomFromCard(socket: Socket, data: any) {
    this.clientNOForCard++;
    this.playerQueue.push({ socket: socket });
    this.logger.log(this.playerQueue.length + ' queue length');
    this.logger.log('befor enter the queue');
    if (this.playerQueue.length == 2) {
      this.roomName = `gameCard-${Math.round(
        this.clientNOForCard / 2,
      ).toString()}`;
      for (let i = 0; i < 2; i++) {
        this.playerQueue[i].socket.join(this.roomName);
      }
      this.server
        .in(this.roomName)
        .emit('enterRoomFromCard', { roomName: this.roomName });
      this.playerQueue.shift();
      this.playerQueue.shift();
    }
  }
  // @SubscribeMessage('joinRoomFromCard')
  // handleJoinRoomFromCard(socket: Socket, data: any) {
  //     this.clientNOForCard++;
  //     this.roomName = `gameCard-${Math.round(this.clientNOForCard / 2).toString()}`;
  //     if (this.clientNOForCard % 2)
  //         this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player1' });
  //     else
  //         this.listClient.push({ id: socket.id, socket: socket, wishPlayer: 'player2' });

  //     this.logger.log(`join to the room : ` + this.roomName);
  //     socket.join(this.roomName);
  //     this.listRooms.set(socket.id, this.roomName);
  //     if (this.numClients[this.roomName] == undefined) {
  //         this.numClients[this.roomName] = 1;
  //         this.logger.log('player 1 in the room : ' + this.roomName);
  //     }
  //     else {
  //         this.numClients[this.roomName]++;
  //         this.logger.log('player 2 in the room : ' + this.roomName);
  //     }
  //     this.logger.log('number of client in the room in the connect: ' + this.roomName + ' : ' + this.numClients[this.roomName]);
  //     if (this.numClients[this.roomName] == 2) {
  //         this.logger.log('enterRoomFromCard server ');
  //         this.server.in(this.roomName).emit('enterRoomFromCard', { roomName: this.roomName, wishPlayer: this.listClient[this.listClient.length - 1].wishPlayer });
  //     }
  // }
  //     this.logger.log(`join to the room : ` + this.roomName);
  //     socket.join(this.roomName);
  //     this.listRooms.set(socket.id, this.roomName);
  //     if (this.numClients[this.roomName] == undefined) {
  //         this.numClients[this.roomName] = 1;
  //         this.logger.log('player 1 in the room : ' + this.roomName);
  //     }
  //     else {
  //         this.numClients[this.roomName]++;
  //         this.logger.log('player 2 in the room : ' + this.roomName);
  //     }
  //     this.logger.log('number of client in the room in the connect: ' + this.roomName + ' : ' + this.numClients[this.roomName]);
  //     if (this.numClients[this.roomName] == 2) {
  //         this.logger.log('enterRoomFromCard server ');
  //         this.server.in(this.roomName).emit('enterRoomFromCard', { roomName: this.roomName, wishPlayer: this.listClient[this.listClient.length - 1].wishPlayer });
  //     }
  // }

  @SubscribeMessage('goalScored')
  handleGoalScored(socket: Socket, data: any) {
    this.playerScore.set(socket.id, this.playerScore.get(socket.id) + 1);
    this.logger.log(
      'goalScored by ' +
        socket.id +
        ' : ' +
        data.wishPlayer +
        ' score: ' +
        this.playerScore.get(socket.id),
    );
    if (this.playerScore.get(socket.id) < 5) {
      const initialVelocityX = Math.random() * 600 + 200;
      const initialVelocityY = Math.random() * 600 + 200;
      setTimeout(() => {
        this.server.in(this.roomName).emit('bothInRoom', {
          roomName: this.roomName,
          initialVelocityX: initialVelocityX,
          initialVelocityY: initialVelocityY,
        });
      }, 2000);
    } else if (this.playerScore.get(socket.id) == 5) {
      this.server.in(this.roomName).emit('gameOver');
    }
  }
  @SubscribeMessage('goalScored')
  handleGoalScored(socket: Socket, data: any) {
    this.playerScore.set(socket.id, this.playerScore.get(socket.id) + 1);
    this.logger.log(
      'goalScored by ' +
        socket.id +
        ' : ' +
        data.wishPlayer +
        ' score: ' +
        this.playerScore.get(socket.id),
    );
    if (this.playerScore.get(socket.id) < 5) {
      const initialVelocityX = Math.random() * 600 + 200;
      const initialVelocityY = Math.random() * 600 + 200;
      setTimeout(() => {
        this.server.in(this.roomName).emit('bothInRoom', {
          roomName: this.roomName,
          initialVelocityX: initialVelocityX,
          initialVelocityY: initialVelocityY,
        });
      }, 2000);
    } else if (this.playerScore.get(socket.id) == 5) {
      this.server.in(this.roomName).emit('gameOver');
    }
  }

  @SubscribeMessage('replayClient')
  handleReplayClient(socket: Socket, data: any) {
    this.logger.log('replayClient');
    this.server.in(data.roomName).emit('replayServer', data);
  }
  @SubscribeMessage('replayClient')
  handleReplayClient(socket: Socket, data: any) {
    this.logger.log('replayClient');
    this.server.in(data.roomName).emit('replayServer', data);
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
    } else
      this.logger.log(
        'the number of client in the room is not 2 but is => ' +
          this.numClients[data.roomName] +
          '||' +
          data.roomName,
      );
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
    } else
      this.logger.log(
        'the number of client in the room is not 2 but is => ' +
          this.numClients[data.roomName] +
          '||' +
          data.roomName,
      );
  }

  @SubscribeMessage('startBall')
  handleStartBall(socket: Socket, data: any) {
    this.logger.log('start ball');
    this.server.to(data.roomName).emit('startBallBack', data);
  }
  @SubscribeMessage('startBall')
  handleStartBall(socket: Socket, data: any) {
    this.logger.log('start ball');
    this.server.to(data.roomName).emit('startBallBack', data);
  }

  @SubscribeMessage('setScore')
  handleSetScore(socket: Socket, data: any) {
    this.logger.log('set score');
    this.server.to(data.roomName).emit('setScoreBack', data);
  }
  @SubscribeMessage('setScore')
  handleSetScore(socket: Socket, data: any) {
    this.logger.log('set score');
    this.server.to(data.roomName).emit('setScoreBack', data);
  }

  @SubscribeMessage('move')
  handleMove(socket: Socket, data: any): void {
    this.server.to(data.roomName).emit('moveback', data);
  }
  @SubscribeMessage('move')
  handleMove(socket: Socket, data: any): void {
    this.server.to(data.roomName).emit('moveback', data);
  }
}
