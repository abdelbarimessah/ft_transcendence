import { collectGenerateParams } from "next/dist/build/utils";
import * as Phaser from "phaser";
import { io } from "socket.io-client";
import eventsCenter from "./EventsCenter";

var socketClient = io("http://localhost:3000");
export default class PongGame extends Phaser.Scene {
  p1: any;
  p2: any;
  ball: any;
  isgamestarted: boolean = false;
  cursors: any;
  wKey: any;
  sKey: any;
  p1victory: any;
  p2victory: any;
  p1goaltext: any;
  p2goaltext: any;
  p1score_number: number;
  p2score_number: number;
  goalScored: boolean;
  checkScene: boolean = false;
  
  sendBallx: number = 0;
  sendBallY: number = 0;
  

  playerData: {roomName: string, wishPlayer: string} ;

  constructor() {
    super('PongGame');
    this.p1score_number = 0;
    this.p2score_number = 0;
    this.goalScored = false;
    this.playerData = {
      roomName: '',
      wishPlayer: ''
    }
  }
  preload() {
    this.load.image("table", "../assets/table2.png");
    this.load.image("paddle", "../assets/padle.png");
    this.load.image("ball", "../assets/ball.png");
  }
  
  create() {
    if (!this.checkScene) {
      socketClient.emit("joinRoom");
      socketClient.on('enterRoom', (data) => {
        this.playerData.roomName = data.roomName;
        this.playerData.wishPlayer = data.wishPlayer;
        console.log(this.playerData.roomName);
        console.log(this.playerData.wishPlayer);
      });
      this.checkScene = true;
    }
    const table = this.add.image(0, 0, "table").setOrigin(0, 0);
    table.setDepth(-1);
    this.ball = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      "ball"
    );
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1, 1);

    this.p1 = this.physics.add.sprite(
      this.physics.world.bounds.width - 50,
      this.physics.world.bounds.height / 2,
      "paddle"
    );
    this.p1.setCollideWorldBounds(true);
    this.p1.setImmovable(true);

    this.p2 = this.physics.add.sprite(
      this.physics.world.bounds.width - 850,
      this.physics.world.bounds.height / 2,
      "paddle"
    );
    this.p2.setCollideWorldBounds(true);
    this.p2.setImmovable(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.ball.setScale(0.7);
    this.p1.setScale(0.7);
    this.p2.setScale(0.7);

    this.physics.add.collider(this.ball, this.p1);
    this.physics.add.collider(this.ball, this.p2);
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.isgamestarted) {
        socketClient.emit("startGameClinet", { roomName: this.playerData.roomName });
      }
    });
    socketClient.on("startGameServer", (data) => {
      if (data.roomName == this.playerData.roomName) {
        this.startGame();
      }
    });
    socketClient.on("leaveRoom", (data) => {
      console.log('the other player left the room');
      this.scene.stop("PongGame");
    })
    this.p1victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("you wins!".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "you wins!",
      { fontSize: "32px", fill: "#fff" }
    );
    this.p1victory.visible = false;
    this.p2victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("you lose".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "you lose!",
      { fontSize: "32px", fill: "#fff" }
    );
    this.p2victory.visible = false;

    this.p2goaltext = this.add.text(
      this.physics.world.bounds.width / 2 - 150,
      20,
      "0",
      { fontSize: "150px", fill: "#fff" }
    );
    this.p1goaltext = this.add.text(
      this.physics.world.bounds.width / 2 + 100,
      20,
      "0",
      { fontSize: "150px", fill: "#fff" }
    );
    this.p1goaltext.setAlpha(0.2);
    this.p2goaltext.setAlpha(0.2);
  }

  scorep1(): void {
    this.p1score_number += 1;
    const p1s = this.p1score_number / 60;
    this.p1goaltext.setText(p1s.toFixed(0));
    if (p1s === 5) {
      this.p1victory.visible = true;
    }
  }
  scorep2(): void {
    this.p2score_number += 1;
    const p2s = this.p2score_number / 60;
    this.p2goaltext.setText(p2s.toFixed(0));
    if (p2s === 5) {
      this.p2victory.visible = true;
    }
  }

  update() {
    if (this.ball.body.x > 870) {
      this.scorep2();
      this.resetGame();
      this.ball.setVelocityX(0);
      this.ball.setVelocityY(0);
    }
    if (this.ball.body.x < 30) {
      this.scorep1();
      this.resetGame();
      this.ball.setVelocityX(0);
      this.ball.setVelocityY(0);
    }

    this.p1.body.setVelocity(0);
    this.p2.body.setVelocity(0);
    if (this.cursors.up.isDown) {
      this.p1.setVelocityY(-500);
      console.log('room name ' + this.playerData.roomName);
      socketClient.emit("move", { p1Y: this.p1.y, id: socketClient.id, roomName: this.playerData.roomName });
    } else if (this.cursors.down.isDown) {
      this.p1.setVelocityY(500);
      socketClient.emit("move", { p1Y: this.p1.y, id: socketClient.id, roomName: this.playerData.roomName });
    } else {
      this.p1.setVelocityY(0);
      socketClient.emit("move", { p1Y: this.p1.y, id: socketClient.id, roomName: this.playerData.roomName });
    }
    socketClient.on("moveback", (data) => {
      if (data.id != socketClient.id) {
        this.p2.y = data.p1Y;
      }
    });
    this.p1victory.setPosition(
      this.physics.world.bounds.width / 2 - this.p1victory.width / 2,
      this.physics.world.bounds.height / 1.7
    );
    this.p2victory.setPosition(
      this.physics.world.bounds.width / 2 - this.p2victory.width / 2,
      this.physics.world.bounds.height / 1.7
    );
  }
  startGame() {
    this.p1victory.visible = false;
    this.p2victory.visible = false;
    const initialVelocityX = Math.random() * 500 + 200;
    const initialVelocityY = Math.random() * 500 + 200;
    let directionX = -1;
    this.sendBallx = initialVelocityX;
    this.sendBallY = initialVelocityY;
    socketClient.emit("startBall", { ballX: this.sendBallx, ballY: this.sendBallY, roomName: this.playerData.roomName, id: socketClient.id });
    socketClient.on("startBallBack", (data) => {
      if (data.roomName == this.playerData.roomName && data.id == socketClient.id) {
        this.ball.setVelocityX(data.ballX);
        this.ball.setVelocityY(data.ballY);
        console.log(data.ballX * directionX)
      }
      else if (data.roomName == this.playerData.roomName && data.id != socketClient.id) {
        this.ball.setVelocityX(data.ballX * directionX);
        this.ball.setVelocityY(data.ballY);
      }

    });
    this.isgamestarted = true;
  }

  resetGame() {
    this.ball.setPosition(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2
    );
    this.ball.setVelocity(0, 0);
    this.ball.setAcceleration(0, 0);
    this.ball.setAngularVelocity(0);
    this.ball.setAngularAcceleration(0);
    this.ball.body.enable = false;

    this.isgamestarted = false;
    this.goalScored = false;

    this.time.delayedCall(1000, () => {
      this.ball.body.enable = true;
    });
  }
}
