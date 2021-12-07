const WIDTH = 500
const HEIGHT = 300

import { Menu } from './scenes/menu.js'

const config = {
    width: WIDTH,
    height: HEIGHT,
    type: Phaser.AUTO,
    resolution: 2.65,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400}
        }
    },
    scene: [Menu]
}

const game = new Phaser.Game(config)