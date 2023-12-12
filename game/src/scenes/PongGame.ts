import Phaser from "phaser";
import { io, Socket } from "socket.io-client";

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
  socketClient: Socket;
  roomName: string;
  checkScene: boolean = false;

  constructor() {
    super('PongGame');
    this.socketClient = io("http://localhost:3000");
    this.p1score_number = 0;
    this.p2score_number = 0;
    this.goalScored = false;
    this.roomName = '';
    this.socketClient.emit(
      "message",
      "Hello there from the client in the game part!"
    );
    // this.socketClient.on("room", (data) => {
    //   console.log(data);
    //   this.roomName = data;
    // });
    // this.socketClient.on("enterRoom", (data) => {
    //   console.log(data);
    //   this.roomName = data;
    //   // this.socketClient.emit("roomback", this.roomName);
    // });
    
  }
  preload() {
    this.load.image("table", "assets/table2.png");
    this.load.image("paddle", "assets/padle.png");
    this.load.image("ball", "assets/ball.png");
  }
  
  create() {
    if(!this.checkScene) {
      this.socketClient.emit("joinRoom");
      this.socketClient.on('enterRoom', (data) => {
        console.log(data);
        this.roomName = data;
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
    this.wKey = this.input.keyboard.addKey("W");
    this.sKey = this.input.keyboard.addKey("S");
    this.ball.setScale(0.7);
    this.p1.setScale(0.7);
    this.p2.setScale(0.7);

    this.physics.add.collider(this.ball, this.p1);
    this.physics.add.collider(this.ball, this.p2);
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.isgamestarted) {
        this.startGame();
      }
    });
    this.p1victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("Player 1 wins!".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "Player 1 wins!",
      { fontSize: "32px", fill: "#fff" }
    );
    this.p1victory.visible = false;
    this.p2victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("Player 1 wins!".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "Player 2 wins!",
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
      console.log('room name ' + this.roomName);
      this.socketClient.emit("move", {p1Y: this.p1.y, id: this.socketClient.id, roomName: this.roomName});
    } else if (this.cursors.down.isDown) {
      this.p1.setVelocityY(500);
      this.socketClient.emit("move", {p1Y: this.p1.y, id: this.socketClient.id, roomName: this.roomName});
    } else {
      this.p1.setVelocityY(0);
      this.socketClient.emit("move", {p1Y: this.p1.y, id: this.socketClient.id, roomName: this.roomName});
    }
    // this.socketClient.on("moveback", (players) => {
    //   for (const id in players) {
    //     if (id != this.socketClient.id) 
    //       this.p2.y = players[id].y;
    //   }
    // });
    this.socketClient.on("moveback", (data) => {
      if(data.id != this.socketClient.id) {
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
    const initialVelocityX = Math.random() * 500 + 100;
    const initialVelocityY = Math.random() * 500 + 100;
    const directionX = Math.random() < 0.5 ? -1 : 1;
    this.ball.setVelocityX(directionX * initialVelocityX);
    this.ball.setVelocityY(initialVelocityY);
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
