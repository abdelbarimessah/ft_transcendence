import Phaser from 'phaser'
import './style/main.css'
import PongGame from './scenes/PongGame'

class MyScene extends Phaser.Scene {
	constructor() {
		super('MyScene');
	}

	create() {
		const button = this.add.text(400, 300, 'Click me!', { fill: '#fff' })
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
	// scale: {
	// 	mode: Phaser.Scale.RESIZE,
	// 	autoCenter: Phaser.Scale.CENTER_BOTH
	// },
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

export default new Phaser.Game(config) 
