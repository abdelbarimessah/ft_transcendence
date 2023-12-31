'use client'
import * as Phaser from 'phaser';
import PongGame from '@/components/PongGame';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

let games: Phaser.Game;   
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
function startGame() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
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
    scene: [MyScene, PongGame]
  };

  games = new Phaser.Game(config);
}
function Home() {
  useEffect(() => {
    startGame();

    return () => {
      if (games)
        games.destroy(true);
    }
  }, []);


  return (
    <div>
    </div>
  )
}

const DynamicComponentWithNoSSR = dynamic(() => Promise.resolve(Home), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />