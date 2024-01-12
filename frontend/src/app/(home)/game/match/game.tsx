import { Game as PhaserGame } from "phaser";
import { useEffect, useRef, useState } from "react";
import PongGame from "@/components/PongGame";

let newGame: Phaser.Game;   
class MyScene extends Phaser.Scene {
    constructor() {
      super('MyScene');
    }
    create() {
      var button;
      const graphics = this.add.graphics();
      graphics.lineStyle(1, 0xffffff);
      graphics.strokeRoundedRect(375, 280, 150, 40, 20);

      button = this.add.text(450, 300, 'Start Game!', { color: '#fff'})
      .setInteractive()
      .on('pointerdown', () => {

        this.scene.start('PongGame');
      });
      button.setOrigin(0.5, 0.5);
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
      type:   Phaser.CANVAS ,
      width: 900,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          fps: 120,
        }
      },
      // fps: {
      //   target: 0,
      // },
      scale: {
        mode: Phaser.Scale.FIT,
        width: 900,
        height: 600
      },
      // scale: {
      //   mode: Phaser.Scale.FIT,
      //   autoCenter: Phaser.Scale.CENTER_BOTH,
      //   width: 800,
      //   height: 600
    // },
      scene: [MyScene, PongGame]
    };

export default function Game() {
    const parentEl = useRef<HTMLDivElement>(null);

    let [game, setGame] = useState<PhaserGame | null>(null);

    useEffect(() => {
      if (!parentEl.current) return;


      const newGame = new PhaserGame({ ...gameConfig, parent: parentEl.current, width: parentEl.current.offsetWidth, height: parentEl.current.offsetHeight });
      // newGame = new Phaser.Game({ ...gameConfig, parent: parentEl.current });
      setGame(newGame);

      return () => {
        // newGame?.destroy(true, true);
        newGame?.destroy(true);
        console.log("🐲 DESTROY 🐲");
      };
    }, []);

    return (
        // <div ref={parentEl} className="gameContainer w-screen h-1/2 block" />
        <div ref={parentEl}  className="flex items-center justify-center w-full flex-1"/>
    );
}


// 'use client'
// import * as Phaser from 'phaser';
// import PongGame from '@/components/PongGame';
// import { useEffect } from 'react';
// import dynamic from 'next/dynamic';

// let games: Phaser.Game;   
// class MyScene extends Phaser.Scene {
//   constructor() {
//     super('MyScene');
//   }
//   create() {
//     var button;
//     const graphics = this.add.graphics();
//     graphics.lineStyle(1, 0xffffff);
//     graphics.strokeRoundedRect(375, 280, 150, 40, 20);

//     button = this.add.text(450, 300, 'Start Game!', { color: '#fff'})
//     .setInteractive()
//     .on('pointerdown', () => {
//       this.scene.start('PongGame');
//     });
//     button.setOrigin(0.5, 0.5);
//   }
// }
// function startGame() {
//   const config: Phaser.Types.Core.GameConfig = {
//     type: Phaser.CANVAS,
//     width: 900,
//     height: 600,
//     physics: {
//       default: 'arcade',
//       arcade: {
//         gravity: { y: 0 },
//         fps: 120,
//       }
//     },
//     // fps: {
//     //   target: 0,
//     // },
//     scale: {
//       mode: Phaser.Scale.FIT,
//       width: 900,
//       height: 600
//     },
//     scene: [MyScene, PongGame]
//   };

//   games = new Phaser.Game(config);
// }
// function Home() {
//   useEffect(() => {
//     startGame();

//     return () => {
//       if (games)
//         games.destroy(true);
//     }
//   }, []);


//   return (
//     <div>
//     </div>
//   )
// }

// export default Home;

// const DynamicComponentWithNoSSR = dynamic(() => Promise.resolve(Home), {
//   ssr: false
// })

// export default () => <DynamicComponentWithNoSSR />