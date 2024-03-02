'use client'
import * as Phaser from "phaser";
import { Socket } from "socket.io-client";

export default class aiMode extends Phaser.Scene {
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
  ballMovingToP2: boolean;


  state: {
    p1score: number;
    p2score: number;
  };
  goalScored: boolean;
  constructor(
    private socketClient: Socket,
  ) {
    super();
    this.p1score_number = 0;
    this.p2score_number = 0;
    this.ballMovingToP2 = true;
    this.state = {
      p1score: 0,
      p2score: 0,
    };
    this.goalScored = false;
  }
  incrementP1Score() {
    this.state.p1score += 1;
    this.p1goaltext.setText(this.state.p1score);
  }

  incrementP2Score() {
    this.state.p2score += 1;
    this.p2goaltext.setText(this.state.p2score);
  }
  preload() {
    this.load.image("table", "../../assets/table2.png");
    this.load.image("paddle", "../../assets/padle.png");
    this.load.image("ball", "../../assets/ball.png");
  }

  create() {
    const table = this.add.image(0, 0, "table").setOrigin(0, 0);
    table.setDepth(-1);
    this.ball = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      "ball"
    );
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;
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

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.ball.setScale(0.7);
    this.p1.setScale(0.7);
    this.p2.setScale(0.7);

    this.physics.add.collider(this.ball, this.p1);
    this.physics.add.collider(this.ball, this.p2);
    this.input.keyboard?.on("keydown-SPACE", () => {
      if (!this.isgamestarted) {
        this.startGame();
      }
    });

    this.physics.add.collider(this.ball, this.p1, () => {
      this.ballMovingToP2 = true;
    });
    this.physics.add.collider(this.ball, this.p2, () => {
      this.ballMovingToP2 = false;
    });
    this.p1victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("Player 1 wins!".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "you win!",
      { fontSize: "50px", color: "#fff", font: 'poppins' }
    );
    this.p1victory.visible = false;
    this.p2victory = this.add.text(
      this.physics.world.bounds.width / 2 - ("Player 1 wins!".length * 32) / 3,
      this.physics.world.bounds.height / 1.7,
      "Ai win!",
      { fontSize: "50px", color: "#fff" }
    );
    this.p2victory.visible = false;

    this.p2goaltext = this.add.text(
      this.physics.world.bounds.width / 2 - 150,
      20,
      '0',
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
  };

  scorep1(): void {
    this.p1score_number += 1;
    const p1s = this.p1score_number / 60;
    this.p1goaltext.setText(p1s.toFixed(0));
    if (p1s === 5) {
      this.p1victory.visible = true;
      this.p1.setActive(false).setVisible(false);
      this.p2.setActive(false).setVisible(false);
      this.ball.setActive(false).setVisible(false);
      this.socketClient.emit('endGameAiMode')
    }
  }
  scorep2(): void {
    this.p2score_number += 1;
    const p2s = this.p2score_number / 60;
    this.p2goaltext.setText(p2s.toFixed(0));
    if (p2s === 5) {
      this.p2victory.visible = true;
      this.p1.setActive(false).setVisible(false);
      this.p2.setActive(false).setVisible(false);
      this.ball.setActive(false).setVisible(false);
      this.socketClient.emit('endGameAiMode')
    }
  }

  update() {
    if (this.ball.body.x > 900) {
      this.scorep2();
      this.resetGame();
      this.ball.setVelocityX(0);
      this.ball.setVelocityY(0);
    }

    if (this.ball.body.x < 0) {
      this.scorep1();
      this.resetGame();
      this.ball.setVelocityX(0);
      this.ball.setVelocityY(0);
    }

    this.p1.body.setVelocity(0);
    this.p2.body.setVelocity(0);
    if (this.cursors.up.isDown) {
      this.p1.setVelocityY(-500);
    } else if (this.cursors.down.isDown) {
      this.p1.setVelocityY(500);
    } else {
      this.p1.setVelocityY(0);
    }
    const futureBallPosition = this.ball.body.y + this.ball.body.velocity.y / 60;
    const tolerance = 5;
    if (this.ballMovingToP2) {
      if (futureBallPosition < this.p2.body.y - tolerance) {
        this.p2.setVelocityY(-500);
      } else if (futureBallPosition > this.p2.body.y + tolerance) {
        this.p2.setVelocityY(500);
      } else {
        this.p2.setVelocityY(0);
      }
    } else {
      this.p2.setVelocityY(0);
    }

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

    this.ball.setVelocityX(initialVelocityX);
    this.ball.setVelocityY(initialVelocityY);
    this.isgamestarted = true;

  }
  resetGame() {
    if (this.ball && this.ball.body) {
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
}
