export class Menu extends Phaser.Scene {

  preload() {

    this.load.image('background', 'assets/images/backgrounds/BG1.png')
    this.load.image('clouds', 'assets/images/backgrounds/BG2.png')
    this.load.image('wood', 'assets/images/backgrounds/BG3.png')

    this.load.image('button', 'assets/images/button.png')

    this.load.image('tiles', 'assets/tilesets/Tileset.png')
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json')

  }

  create() {

    this.add.image(250, 150, 'background').setScale(1.7)
    this.add.image(250, 150, 'clouds').setScale(1.7)
    this.add.image(250, 150, 'wood').setScale(1.7)
    
    const helloButton = this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    helloButton.setInteractive();

    helloButton.on('pointerover', () => { console.log('pointerover'); });

    const map = this.make.tilemap({ key: 'map' })

    const tileset = map.addTilesetImage('tilemap', 'tiles')

    map.createStaticLayer('Tiled Layer 1', tileset, 0, 0)

  }

  update() {

  }

}