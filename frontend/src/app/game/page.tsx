'use client'
import * as Phaser from 'phaser';
import PongGame from '@/components/PongGame';
import { useEffect } from 'react';

export default function Home() {
useEffect(() => {
  let games: Phaser.Game;
  function startGame() {
    class MyScene extends Phaser.Scene {
      constructor() {
        super('MyScene');
      }
    
      create() {
        const button = this.add.text(400, 300, 'Start Game!', { fill: '#fff' })
          .setInteractive()
          .on('pointerdown', () => {
            this.scene.start('PongGame');
          });
        const border = this.add.rectangle(400, 300, button.width + 10, button.height + 10)
          .setStrokeStyle(2, 0xffffff);
    
        border.setOrigin(0.5, 0.5);
        button.setOrigin(0.5, 0.5);
      }
    }
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 900,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      fps: {
        target: 60,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        width: 900,
        height: 600
      },
      scene: [MyScene, PongGame]
    };
    games = new Phaser.Game(config);
  }
  startGame();
  
  return () => {
    if(games)
    games.destroy(true);
  }
}, []);

  return (
    <div></div>
  )
}
