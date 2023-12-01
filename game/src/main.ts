import Phaser from 'phaser'

import PongGane from './scenes/PongGane'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
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
	scene: [PongGane]
};

export default new Phaser.Game(config) 
