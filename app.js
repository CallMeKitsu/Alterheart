const WIDTH = 500
const HEIGHT = 300

import { Menu } from './scenes/Menu.js'
import { Level_1 } from './scenes/Level_1.js'

const config = {
    width: WIDTH,
    height: HEIGHT,
    type: Phaser.AUTO,
    resolution: 2.65,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: false
        }
    },
    scene: [Menu, Level_1]
}

const game = new Phaser.Game(config)