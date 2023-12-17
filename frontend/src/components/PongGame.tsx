import { collectGenerateParams } from "next/dist/build/utils";
import * as Phaser from "phaser";
import { io } from "socket.io-client";

var socketClient = io("http://localhost:3000");
export default class PongGame extends Phaser.Scene {
  p1: any;
  p2: any;
  ball: any;
  table: any;
  isgamestarted: boolean = false;
  cursors: any;
  wKey: any;
  sKey: any;
  p1victory: any;
  p2victory: any;
  p1goaltext: any;
  p2goaltext: any;
  replayButton: any;
  graphics: any;
  flags: number = 0;

  p1score_number: number;
  p2score_number: number;
  goalScored: boolean;
  checkScene: boolean = false;

  sendBallx: number = 0;
  sendBallY: number = 0;


  playerData: { roomName: string, wishPlayer: string };

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

  initRoomData(): void {
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
  }

  handleSocketEventsOn(): void {
    socketClient.on("startGameServer", (data) => {
      if (data.roomName == this.playerData.roomName) {
        this.startGame();
      }
    });
    socketClient.on("leaveRoom", (data) => {
      console.log('the other player left the room');
      this.scene.stop("PongGame");
    })
    socketClient.on("replayServer", (data) => {
      if (this.flags === 0) {
        this.p1.setActive(false).setVisible(false);
        this.p2.setActive(false).setVisible(false);
        this.ball.setActive(false).setVisible(false);
        this.table.setActive(false).setVisible(false);
        this.p1score_number = 0;
        const p1s = this.p1score_number / 60;
        this.p1goaltext.setText(p1s.toFixed(0));
        this.p2score_number = 0;
        const p2s = this.p2score_number / 60;
        this.p2goaltext.setText(p2s.toFixed(0));
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.strokeRoundedRect(375, 280, 150, 40, 20);
        
        this.replayButton = this.add.text(450, 300, 'Restart Game!', { color: '#fff' })
        this.replayButton.setOrigin(0.5, 0.5);
        this.replayButton.setInteractive()
        this.replayButton.on('pointerdown', () => {
          this.flags = 1;
          this.p1.setActive(true).setVisible(true);
          this.p2.setActive(true).setVisible(true);
          this.ball.setActive(true).setVisible(true);
          this.table.setActive(true).setVisible(true);
          this.p1victory.visible = false;
          this.p2victory.visible = false;
          this.replayButton.destroy();
          this.graphics.destroy();
        });
      }
    });
  }

  create() {
    this.initRoomData();
    this.handleSocketEventsOn();
    this.table = this.add.image(0, 0, "table").setOrigin(0, 0);
    this.table.setDepth(-1);
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
    this.p1victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("you wins!".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "you wins!",
      { fontSize: "32px", color: "#517761" }
    );
    this.p1victory.visible = false;
    this.p2victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("you lose".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "you lose!",
      { fontSize: "32px", color: "#CD4332" }
    );
    this.p2victory.visible = false;

    this.p2goaltext = this.add.text(
      this.physics.world.bounds.width / 2 - 175,
      20,
      "0",
      { fontSize: "150px", color: "#fff" }
    );
    this.p1goaltext = this.add.text(
      this.physics.world.bounds.width / 2 + 100,
      20,
      "0",
      { fontSize: "150px", color: "#fff" }
    );
    this.p1goaltext.setAlpha(0.2);
    this.p2goaltext.setAlpha(0.2);
  }

  scorep1(): void {
    this.p1score_number += 1;
    const p1s = this.p1score_number / 60;
    this.p1goaltext.setText(p1s.toFixed(0));
    if (p1s === 1) {
      this.p1victory.visible = true;
      setTimeout(() => {
        // this.scene.stop("PongGame");
        socketClient.emit("replayClient", { roomName: this.playerData.roomName });
      }, 1000);
    }
  }
  scorep2(): void {
    this.p2score_number += 1;
    const p2s = this.p2score_number / 60;
    this.p2goaltext.setText(p2s.toFixed(0));
    if (p2s === 1) {
      this.p2victory.visible = true;
      setTimeout(() => {
        // this.scene.stop("PongGame");
        socketClient.emit("replayClient", { roomName: this.playerData.roomName, id: socketClient.id});
      }, 1000);
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
      this.p1.setVelocityY(-800);
      console.log('room name ' + this.playerData.roomName);
      socketClient.emit("move", { p1Y: this.p1.y, id: socketClient.id, roomName: this.playerData.roomName });
    } else if (this.cursors.down.isDown) {
      this.p1.setVelocityY(800);
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
    // setTimeout(() => {
    //   this.p1.setPosition(
    //     this.physics.world.bounds.width - 50,
    //     this.physics.world.bounds.height / 2
    //   );
    // }, 1000);
    this.ball.setVelocity(0, 0);
    this.ball.setAcceleration(0, 0);
    this.ball.setAngularVelocity(0);
    this.ball.setAngularAcceleration(0);
    this.ball.body.enable = false;
    // this.p1.body.enable = false;

    this.isgamestarted = false;
    this.goalScored = false;

    this.time.delayedCall(1000, () => {
      // this.p1.body.enable = true;
      this.ball.body.enable = true;
    });
  }
}
