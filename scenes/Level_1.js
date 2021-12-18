export class Level_1 extends Phaser.Scene {

  SPEED = 5
  JUMP = 8
  PLACEMENT = 1600

  constructor() {
    super({
      key: "Level_1",
      physics: {
        matter: {
          gravity: { y: 1 },
          debug: false
        },
      }
    })
  }

  preload() {

    this.load.image('background', 'assets/images/backgrounds/BG1.png')
    this.load.image('clouds', 'assets/images/backgrounds/BG2.png')
    this.load.image('wood', 'assets/images/backgrounds/BG3.png')
    this.load.image('solid', 'assets/images/test/solid.png')
    this.load.image('decors', 'assets/images/test/decors.png')
    this.load.json('hitbox', 'assets/hitboxes/level1.json')
    
    this.load.spritesheet('player', 
      'assets/sprites/dude.png',
      { frameWidth: 84, frameHeight: 84 }
    )

    this.load.spritesheet('wolf', 
      'assets/sprites/animals.png',
      {frameWidth: 16, frameHeight: 16 }
    )

  }

  create() {

    this.add.image(250, 150, 'background').setScale(1.7).setScrollFactor(0)
    this.add.image(250, 150, 'clouds').setScale(1.7).setScrollFactor(0)
    this.add.image(250, 150, 'wood').setScale(1.7).setScrollFactor(0)
    this.collide()
    this.decors = this.add.image(this.PLACEMENT, 150, 'decors')

    this.player = this.matter.add.sprite(250, 0, 'player', 0).setScale(0.7).setCollisionGroup(this.platforms).setFixedRotation()
    this.createAnims()

    this.cameras.main.setBounds(0, 0, this.solid.displayWidth, this.solid.displayHeight)
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
    this.cameras.main.scrollY = 150

  }

  update() {

    console.log(this.player.x)
    
    this.move(false)

  }

  move(log) {
    
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys = this.input.keyboard.addKeys({
      space: "SPACE",
      keyUp: this.cursors.up,
      keyDown: this.cursors.down,
      keyRight: this.cursors.right,
      keyLeft: this.cursors.left,
    })

    if (this.keys.keyLeft.isDown && this.keys.keyUp.isUp) {

      if(log === true) console.log("gauche")
      this.player.anims.play('left', true)
      this.player.setVelocityX(-this.SPEED)

    }
    else if (this.keys.keyRight.isDown && this.keys.keyUp.isUp) {

      if(log === true) console.log('droite')
      this.player.anims.play('right', true)
      this.player.setVelocityX(this.SPEED)

    }
    else if (this.keys.keyRight.isDown && this.keys.keyUp.isDown && this.keys.keyLeft.isUp) {

      if(log === true) console.log('droite haut')
      this.player.anims.play('jump_right', true)
      this.player.setVelocityX(this.SPEED)
      if(this.onGround(this.player)) this.player.setVelocityY(-this.JUMP)
      
    }
    else if (this.keys.keyLeft.isDown && this.keys.keyUp.isDown && this.keys.keyRight.isUp) {

      if(log === true) console.log('gauche haut')
      this.player.anims.play('jump_left', true)
      this.player.setVelocityX(-this.SPEED)
      if(this.onGround(this.player, this.platforms)) this.player.setVelocityY(-this.JUMP)

    }
    else if (this.keys.keyUp.isDown && this.keys.keyLeft.isUp && this.keys.keyRight.isUp) {

      if(log === true) console.log('haut')
      if(this.onGround(this.player, this.platforms)) this.player.setVelocityY(-this.JUMP)

    }
    else if (this.onGround(this.player) && this.keys.space.isDown) {

      if(log === true) console.log('slash droite')
      this.player.anims.play('slash_right')
    
    }
    else { 

      this.player.anims.play('mid', true)
      this.player.setVelocityX(0)
      
    }
  }

  createAnims() {
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 20, end: 25 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 14, end: 19 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'mid',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'jump_left',
        frames: this.anims.generateFrameNumbers('player', { start: 21, end: 21 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'jump_right',
        frames: this.anims.generateFrameNumbers('player', { start: 15, end: 15 }),
        frameRate: 10,
        repeat: -1
    })    

    this.anims.create({
        key: 'slash_right',
        frames: this.anims.generateFrameNumbers('player', { start: 32, end: 34 }),
        frameRate: 10,
        repeat: -1
    })   

    this.anims.create({
        key: 'slash_left',
        frames: this.anims.generateFrameNumbers('player', { start: 34, end: 36 }),
        frameRate: 10,
        repeat: -1
    })   

  }

  collide() {

    this.platforms = this.matter.world.nextGroup()

    var shapes = this.cache.json.get('hitbox')

    this.solid = this.matter.add.image(this.PLACEMENT, 245, 'solid', 0, {shape: shapes.solid}).setStatic(true).setCollisionGroup(this.platforms)
    
    this.matter.world.setBounds(0, 0, this.solid.displayWidth, this.solid.displayHeight)

  }

  onGround(sprite) {

    if(sprite.body.velocity.y === 0) return true
    return false

  }

  

}