export class Enemy extends Phaser.Physics.Matter.Sprite {

  constructor(scene, spriteTexture, x, y, keyframe, stats) {
    super(scene.matter.world, x, y, spriteTexture, keyframe)
    scene.add.existing(this)

    this.HEALBAR = stats.pv
    this.STRENGH = stats.strength
    this.texture = spriteTexture
    this.sceneAnimation = scene.anims
  }

  heal() {

  }

  damage(hit) {
    this.HEALBAR -= hit
  }

  healbar() {
    return this.HEALBAR
  }

  look(sprite) {

    setInterval(() => {
      
      if(sprite.x > this.x) { this.play('enemy_left') }
      else if (sprite.x < this.x) { this.play('enemy_right')}
      else { this.play('enemy_stand') }
        
    }, 100)
    

  }

  relPos(sprite) {
    
    if(sprite.x > this.x) return -1
    else if (sprite.x < this.x) return 1
    else return 0
    
  }

  anim(animationObject) {

    this.sceneAnimation.create({
        key: 'enemy_stand',
        frames: this.sceneAnimation.generateFrameNumbers(this.texture, { start: animationObject.stand[0], end: animationObject.stand[1] }),
        frameRate: 10,
        repeat: -1
    })

    this.sceneAnimation.create({
        key: 'enemy_left',
        frames: this.sceneAnimation.generateFrameNumbers(this.texture, { start: animationObject.left[0], end: animationObject.left[1] }),
        frameRate: 10,
        repeat: -1
    })
    this.sceneAnimation.create({
        key: 'enemy_right',
        frames: this.sceneAnimation.generateFrameNumbers(this.texture, { start: animationObject.right[0], end: animationObject.right[1] }),
        frameRate: 10,
        repeat: -1
    })
    this.sceneAnimation.create({
        key: 'enemy_jump',
        frames: this.sceneAnimation.generateFrameNumbers(this.texture, { start: animationObject.jump[0], end: animationObject.jump[1] }),
        frameRate: 10,
        repeat: -1
    })
    this.sceneAnimation.create({
        key: 'enemy_attack',
        frames: this.sceneAnimation.generateFrameNumbers(this.texture, { start: animationObject.attack[0], end: animationObject.attack[1] }),
        frameRate: 10,
        repeat: -1
    })
    
  }

}