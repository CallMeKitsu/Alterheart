export class Menu extends Phaser.Scene {

  constructor() {
        super({
            key: "Menu"
        });
    }

  preload() {

    this.load.image('background', 'assets/images/backgrounds/BG1.png')
    this.load.image('clouds', 'assets/images/backgrounds/BG2.png')
    this.load.image('wood', 'assets/images/backgrounds/BG3.png')

    this.load.image('play_up', 'assets/images/buttons/play_up.png')
    this.load.image('play_down', 'assets/images/buttons/play_down.png')
    this.load.image('options_down', 'assets/images/buttons/options_down.png')
    this.load.image('options_up', 'assets/images/buttons/options_up.png')
    this.load.image('quit_up', 'assets/images/buttons/quit_up.png')
    this.load.image('quit_down', 'assets/images/buttons/quit_down.png')

  }

  create() {

    const SCALE = 1
    const MENU_X = 250

    this.add.image(250, 150, 'background').setScale(1.7)
    this.add.image(250, 150, 'clouds').setScale(1.7)
    this.add.image(250, 150, 'wood').setScale(1.7)

    let playButton = this.add.image(MENU_X, 130, 'play_up').setScale(SCALE)
      .setInteractive()
      .on('pointerdown', () => this.scene.start('Level_1'))
      .on('pointerover', () => playButton.setTexture('play_down') )
      .on('pointerout', () => playButton.setTexture('play_up') )

    let optionsButton = this.add.image(MENU_X, 187, 'options_up').setScale(SCALE)
      .setInteractive()
    //.on('pointerdown', () => this.scene.start('Options'))  
      .on('pointerover', () => optionsButton.setTexture('options_down') )
      .on('pointerout', () => optionsButton.setTexture('options_up') )

    let quitButton = this.add.image(MENU_X, 244, 'quit_up').setScale(SCALE)
      .setInteractive()
      .on('pointerdown', () => window.close())
      .on('pointerover', () => quitButton.setTexture('quit_down') )
      .on('pointerout', () => quitButton.setTexture('quit_up') )

  }

  update() {

  }

}