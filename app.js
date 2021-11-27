const WIDTH = 500
const HEIGHT = 300

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
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
}

const game = new Phaser.Game(config)

function preload() {

    this.load.image('background', 'assets/images/BG1.png')
    this.load.image('clouds', 'assets/images/BG2.png')

    this.load.image('tiles', 'assets/tilesets/Tileset.png')
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json')

}

function create() {

    console.log(this)
    this.add.image(250, 150, 'background').setScale(1.7)
    this.add.image(250, 150, 'clouds').setScale(1.7)

    const map = this.make.tilemap({ key: 'map' })

    const tileset = map.addTilesetImage('tilemap', 'tiles')

    map.createStaticLayer('Tiled Layer 1', tileset, 0, 0)

}

function update() {

}