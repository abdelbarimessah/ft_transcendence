
'use client'
import * as Phaser from "phaser";
import { Socket, io } from "socket.io-client";
import { useContext } from 'react';
import { SocketContext } from '@/app/SocketContext';

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

    p1score_number: number;
    p2score_number: number;
    goalScored: boolean;
    checkScene: boolean = false;
    renderReplayButton: boolean = false;

    sendBallx: number = 0;
    sendBallY: number = 0;

    flagGame: boolean = false;
    scoreFlage : boolean = false;

    scores: { user: number, opponent: number }
    playerData: { roomName: string, wishPlayer: string, providerId: string };
    constructor(
        private socketClient: Socket,
        private roomName: string,
    ) {
        super('PongGame');
        this.p1score_number = 0;
        this.p2score_number = 0;
        this.goalScored = false;
        this.playerData = {
            roomName: '',
            wishPlayer: '',
            providerId: ''
        }
        this.scores = {
            user: 0,
            opponent: 0
        }
    }

    preload() {
        this.load.image("table", "../../assets/table2.png");
        this.load.image("paddle", "../../assets/padle.png");
        this.load.image("ball", "../../assets/ball.png");
    }

    initRoomData(): void {
        if (!this.checkScene) {
            this.scene.start('PongGame');
            this.socketClient.emit("joinRoom", { roomName: this.roomName });
            this.socketClient.on('enterRoom', (data) => {
                this.playerData.roomName = data.roomName;
                this.playerData.wishPlayer = data.wishPlayer;
                this.playerData.providerId = data.providerId;
            });
            this.checkScene = true;
        }
    }

    startGame() {
        this.p1victory.visible = false;
        this.p2victory.visible = false;
        const initialVelocityX = Math.random() * 600 + 200;
        const initialVelocityY = Math.random() * 600 + 200;
        let directionX = -1;
        this.sendBallx = initialVelocityX;
        this.sendBallY = initialVelocityY;
        this.socketClient.emit("startBall", { ballX: this.sendBallx, ballY: this.sendBallY, roomName: this.playerData.roomName, id: this.socketClient.id });
        this.socketClient.on("startBallBack", (data) => {
            if (data.roomName == this.playerData.roomName && data.id == this.socketClient.id) {
                this.ball.setVelocityX(data.ballX);
                this.ball.setVelocityY(data.ballY);
            }
            else if (data.roomName == this.playerData.roomName && data.id != this.socketClient.id) {
                this.ball.setVelocityX(data.ballX * directionX);
                this.ball.setVelocityY(data.ballY);
            }
        });

        this.isgamestarted = true;
    }
    handleSocketEventsOn(): void {
        this.socketClient.on("startGameServer", (data) => {
            if (data.roomName == this.playerData.roomName) {
                this.flagGame = true;
                this.p1victory.visible = false;
                this.p2victory.visible = false;
                if (this.playerData.wishPlayer == 'player1') {
                    if (this.ball && data) {
                        this.ball?.setVelocityX(data.initialVelocityX);
                        this.ball?.setVelocityY(data.initialVelocityY);
                    }
                }
                else if (this.playerData.wishPlayer == 'player2') {
                    if (this.ball && data) {
                        this.ball?.setVelocityX(data.initialVelocityX * -1);
                        this.ball?.setVelocityY(data.initialVelocityY);
                    }
                }
                this.isgamestarted = true;
                // this.startGame();
            }
        });
        this.socketClient.on("leaveRoom", (data) => {
            console.log('----22222222222222---------');
        })

    }
    cleanupGame() {
        this.p1score_number = 0;
        this.p2score_number = 0;
        this.goalScored = false;
        this.isgamestarted = false;
        this.flagGame = false;
        this.renderReplayButton = false;

        this.socketClient.off("startGameServer");
        this.socketClient.off("leaveRoom");
        this.p1.setActive(false).setVisible(false);
        this.p2.setActive(false).setVisible(false);
        this.ball.setActive(false).setVisible(false);
        this.table.setActive(false).setVisible(false);
    }

    create() {
        this.socketClient.on('goalScored', (data) => {
            // console.log('the scrore came from the server', data);
            if(this.scoreFlage === false)
            {
                this.scoreFlage = true
                console.log('goal is here');
                
                if (data.player === this.playerData.wishPlayer) {
                    console.log('you score a goal !!!!: ' , this.playerData.wishPlayer);
                    
                    this.scores.user++;
                }
                else
                    this.scores.opponent++;
            }
            console.log('[11111] the score of this match is ', this.scores.user/2, '----', this.scores.opponent/2);
            this.scoreFlage = false;
        })
        // this.socketClient.emit('inGame', this.socketClient.data.providerId)
        this.initRoomData();
        this.socketClient.emit('User-status', { status: 'inGame', providerId: this.playerData.providerId });
        console.log('the provider id of this user is', this.playerData.providerId);


        console.log('socker of this user is ', this.socketClient.id);
        this.socketClient.on("OnePlayerLeaveTheRoom", (data) => {
            console.log('----111111111111111----');
            this.p1.setActive(false).setVisible(false);
            this.p2.setActive(false).setVisible(false);
            this.ball.setActive(false).setVisible(false);
            this.table.setActive(false).setVisible(false);
            this.p1.setActive(false).setVisible(false);
        });

        this.socketClient.on("bothInRoom", (data) => {
            if (data.roomName == this.playerData.roomName) {
                this.flagGame = true;
                this.p1victory.visible = false;
                this.p2victory.visible = false;
                if (this.playerData.wishPlayer == 'player1') {
                    if (this.ball.body && data) {
                        this.ball.setVelocityX(data.initialVelocityX);
                        this.ball.setVelocityY(data.initialVelocityY);
                    }
                }
                else if (this.playerData.wishPlayer == 'player2') {
                    if (this.ball.body && data) {
                        this.ball.setVelocityX(data.initialVelocityX * -1);
                        this.ball.setVelocityY(data.initialVelocityY);
                    }
                }
                this.isgamestarted = true;
            }
        })


        this.handleSocketEventsOn();
        this.table = this.add.image(0, 0, "table").setOrigin(0, 0);
        this.table.setDepth(-1);
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


        this.p1victory = this.add.text(
            this.physics.world.bounds.width / 2 - ("you win!".length * 32) / 3,
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

    scorep1(flag: boolean): void {
        if (flag == true) {
            this.flagGame = false;
            this.p1score_number++;
            const p1s = this.p1score_number;
            this.p1goaltext.setText(p1s.toFixed(0));
            this.socketClient.emit("goalScored", { p1score: this.p1score_number, roomName: this.playerData.roomName, id: this.socketClient.id, wishPlayer: this.playerData.wishPlayer })
            if (p1s === 5) {
                this.p1victory.visible = true;
                console.log('player win ;;;;;;;');
                const gameData = {
                    roomName: this.playerData.roomName,
                    userScore: this.p1score_number,
                    opponentScore: this.p2score_number,
                    winner: this.socketClient.id,
                    loser: '',
                    status: 'win',
                }
                console.log('send the endGame from the pongGame 1');
                this.socketClient.emit("endGame", { gameData });
            }
        }
    }
    scorep2(flag: boolean): void {
        if (flag == true) {
            this.flagGame = false;
            this.p2score_number++;
            let p2s = this.p2score_number;
            if(p2s != this.scores.opponent / 2) 
                p2s = this.scores.opponent / 2
            console.log(this.scores.opponent / 2 ,'opponent score in the scorep2 ::: ', p2s);
            
            this.p2goaltext.setText(p2s.toFixed(0));
            if (p2s === 5) {
                this.p2victory.visible = true;
                console.log('player lose ;;;;;;;');
                const gameData = {
                    roomName: this.playerData.roomName,
                    userScore: this.p1score_number,
                    opponentScore: this.p2score_number,
                    winner: '',
                    loser: this.socketClient.id,
                    status: 'lose',
                }
                console.log('send the endGame from the pongGame 2');
                this.socketClient.emit("endGame", { gameData });
            }
        }
    }

    update() {

        this.socketClient.emit('User-status', { status: 'inGame', providerId: this.playerData.providerId });
        if (this.ball.body.x > 900) {
            this.scorep2(this.flagGame);
            this.resetGame();
            this.ball.setVelocityX(0);
            this.ball.setVelocityY(0);
        }
        else if (this.ball.body.x < 0) {
            this.scorep1(this.flagGame);
            this.resetGame();
            this.ball.setVelocityX(0);
            this.ball.setVelocityY(0);
        }
        this.p1.body.setVelocity(0);
        this.p2.body.setVelocity(0);
        if (this.cursors.up.isDown) {
            this.p1.setVelocityY(-800);
            this.socketClient.emit("move", { p1Y: this.p1.y, id: this.socketClient.id, roomName: this.playerData.roomName });
        } else if (this.cursors.down.isDown) {
            this.p1.setVelocityY(800);
            this.socketClient.emit("move", { p1Y: this.p1.y, id: this.socketClient.id, roomName: this.playerData.roomName });
        } else {
            this.p1.setVelocityY(0);
            this.socketClient.emit("move", { p1Y: this.p1.y, id: this.socketClient.id, roomName: this.playerData.roomName });
        }
        this.socketClient.on("moveback", (data) => {
            if (data.id != this.socketClient.id) {
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
