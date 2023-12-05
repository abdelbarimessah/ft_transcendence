import Phaser from "phaser";
import react, { useState } from "react";

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
  p1score_number : number ;
  p2score_number : number ;
  
  // const [p1score, setp1score] = useState(0);
  // const [p2score, setp2score] = useState(0);
  // p1score: number = 0;
  // p2score: number = 0;
  // const [p1score, setp1score] = useState(0);
  // const [p2score, setp2score] = useState(0);
  state: {
    p1score: number;
    p2score: number;
  };
  goalScored: boolean;
  constructor() {
    super();
    this.p1score_number = 0;
    this.p2score_number = 0;
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
    this.load.image("table", "assets/table2.png");
    this.load.image("paddle", "assets/padle.png");
    this.load.image("ball", "assets/ball.png");
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
      '0',
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
  };

  scorep1() : void {
    this.p1score_number += 1;
    const p1s = this.p1score_number / 60;
    this.p1goaltext.setText(p1s.toFixed(0));
  }
  scorep2() : void {
    this.p2score_number += 1;
    const p2s = this.p2score_number / 60;
    this.p2goaltext.setText(p2s.toFixed(0));
  }

  update() {
    if (this.ball.body.x > 870) {
        // this.goalScored = true;
        
        // setTimeout(() => {
        //     this.incrementP2Score();
        // }, 1000);
        this.scorep2();
        this.resetGame();
        // this.p2goaltext.setText(this.state.p2score);


      // if (this.state.p2score === 5) {
      //   this.p2victory.visible = true;
      // }

      this.ball.setVelocityX(0);
      this.ball.setVelocityY(0);
    }
    if (this.ball.body.x < 30 ) {
      //   setTimeout(() => {
            
      //       this.incrementP1Score();
      //   }, 1000 );
      // this.goalScored = true;
      
    //   setTimeout(() => {
      this.scorep1();
      this.resetGame();
        // }, 2000);
        // this.p1goaltext.setText(this.state.p1score);


      // if (this.state.p1score === 5) {
      //   this.p1victory.visible = true;
      // }

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
    if (this.wKey.isDown) {
      this.p2.setVelocityY(-300);
    } else if (this.sKey.isDown) {
      this.p2.setVelocityY(300);
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
    const initialVelocityX = Math.random() * 500 + 100;
    const initialVelocityY = Math.random() * 500 + 100;
    this.ball.setVelocityX(initialVelocityX);
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
