import Phaser from 'phaser'

import PongGame from './scenes/PongGame'

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
			gravity: { y: 0	}
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
	scene: [PongGame]
};

export default new Phaser.Game(config) 
