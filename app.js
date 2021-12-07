const WIDTH = 500
const HEIGHT = 300

import { Menu } from './scenes/menu.js'

const config = {
    width: WIDTH,
    height: HEIGHT,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400}
        }
    },
    scene: [Menu]
}

const game = new Phaser.Game(config)