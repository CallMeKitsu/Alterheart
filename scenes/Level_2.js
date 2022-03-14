export class Level_2 extends Phaser.Scene {

  SPEED = 2
  JUMP = 6.25
  PLACEMENT = 1500
  ITEMSCALE = 1
  PLAYERSCALE = 0.5

  constructor() {
    super({
      key: "Level_2",
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
    this.load.image('solid_2', 'assets/images/level2/solid.png')
    this.load.image('decors_2', 'assets/images/level2/decors.png')
    this.load.image('killsyou', 'assets/images/level2/killsyou.png')

    this.load.json('hitbox_ground_2', 'assets/hitboxes/level2.json')
    this.load.json('hitbox_player', 'assets/hitboxes/player.json')
    
    this.load.spritesheet('player', 'assets/sprites/dude.png', { frameWidth: 84, frameHeight: 84 })
    this.load.spritesheet('chest', 'assets/sprites/chests.png', { frameWidth: 47, frameHeight: 32 })

  }

  create() {

    this.add.image(250, 150, 'background').setScale(1.7).setScrollFactor(0)
    this.add.image(250, 150, 'clouds').setScale(1.7).setScrollFactor(0)
    this.add.image(250, 150, 'wood').setScale(1.7).setScrollFactor(0)
    this.decors = this.add.image(this.PLACEMENT, 151, 'decors_2')
    this.collide()
    this.placeItems()


    var shapes = this.cache.json.get('hitbox_player')

    this.player = this.matter.add.sprite(250, 200, 'player', 0, { shape: shapes.player })
      .setScale(this.PLAYERSCALE)
      .setCollidesWith([this.platforms])
      .setFixedRotation()

    this.createAnims()

    this.cameras.main.setBounds(0, 0, this.solid.displayWidth, this.solid.displayHeight)
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)

    this.createStoryVariables()

  }

  update() {
    this.move(false)
  
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {

      console.log(bodyB)
    //  if((bodyA.label == "player" && bodyB.label == "killsyou") || (bodyB.label == "player" && bodyA.label == "killsyou")) console.log('collision !')

    })

    this.startStory()

  }

  move(log) {
    
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keys = this.input.keyboard.addKeys({
      space: "SPACE",
      keyUp: this.cursors.up,
      keyDown: this.cursors.down,
      keyRight: this.cursors.right,
      keyLeft: this.cursors.left,
      X: "X"
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
      this.player.anims.play('slash_right', true)
    
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

    this.anims.create({
        key: 'standing_chest',
        frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'opening_chest',
        frames: this.anims.generateFrameNumbers('chest', { start: 4, end: 9 }),
        frameRate: 10,
        repeat: 0
    })   

  }

  collide() {

    this.platforms = this.matter.world.nextCategory()

    this.shapes = this.cache.json.get('hitbox_ground_2')
    this.solid = this.matter.add.image(this.PLACEMENT-74, 245, 'solid_2', 0, { shape: this.shapes.solid }).setStatic(true).setCollisionCategory(this.platforms)
    
    this.matter.world.setBounds(0, 0, this.solid.displayWidth, this.solid.displayHeight)

  }

  placeItems() {

    this.items = this.matter.world.nextCategory()

    this.killsyou = this.matter.add.image(this.PLACEMENT-853, 239, 'killsyou', 0, {shape: this.shapes.killsyou }).setStatic(true).setCollisionCategory(this.platforms)

    // this.key = this.matter.add.image(this.PLACEMENT-673, 232, 'key', 0).setStatic(true).setCollisionCategory(this.items).setFixedRotation().setScale(this.ITEMSCALE)
    // this.key.visible = false

    this.chest = this.matter.add.sprite(this.PLACEMENT, 150, 'chest', 0)
      .setStatic(true)
      .setCollisionCategory(this.items)
    
  }

  startStory() { 

    if(this.isInterract(this.chest)) {
      this.scene.start("Menu")
      alert('YOU DIED.')
    }

  } 

  onGround(sprite) {

    if(sprite.body.velocity.y === 0) return true
    return false

  }

  isInterract(sprite) {


  }

  createStoryVariables() {
  
  }

}