export class Dialog extends Phaser.GameObjects.Image {

  constructor(scene, text) {
    super(scene, 250, 270, "dialog")
    scene.add.existing(this)
    this
      .setScrollFactor(0)
      .setScale(0.5)
      .scene = scene

    if(typeof text === 'string') {
      this.text = scene.add.text(175, 252, text, { font: '10px sans-serif', fill: 'black' })
        .setScrollFactor(0);
    }
    else this.speech(text)
  }

  kill() {
    this.visible = false
    this.destroy()
    this.text.destroy()
  }

  speech(list) {
    
    let i = 0

    this.text = this.scene.add.text(175, 252, list[i], { font: '10px sans-serif', fill: 'black' })
      .setScrollFactor(0)
  
    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.text.destroy()
        i += 1
        this.text = this.scene.add.text(175, 252, list[i], { font: '10px sans-serif', fill: 'black' })
          .setScrollFactor(0)
        if(i === list.length) {
          this.kill()
        }
      },
      repeat: list.length -1
    })
    
  }

  exists() {
    return 1
  }

}