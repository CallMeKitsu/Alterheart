import { Enemy } from '../classes/enemy.js'
import { Dialog } from '../classes/dialog.js'

export class Level_1 extends Phaser.Scene {

  SPEED = 3
  JUMP = 5
  PLACEMENT = 1600
  ITEMSCALE = 1
  PLAYERSCALE = 1
      
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
    this.load.image('solid', 'assets/images/level1/solid.png')
    this.load.image('decors', 'assets/images/level1/decors.png')
    this.load.image('key', 'assets/images/level1/key.png')
    this.load.image('portal', 'assets/images/level1/portal.png')
    this.load.image('aim', 'assets/images/aim.png')
    this.load.image('dialog', 'assets/images/dialog.png')

    this.load.json('hitbox_ground', 'assets/hitboxes/level1.json')
    this.load.json('hitbox_player', 'assets/hitboxes/player.json')
    
    this.load.spritesheet('player', 'assets/sprites/hero.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('wolf', 'assets/sprites/animals.png', { frameWidth: 16, frameHeight: 16 })
    this.load.spritesheet('chest', 'assets/sprites/chests.png', { frameWidth: 47, frameHeight: 32 })
    this.load.spritesheet('fox', 'assets/sprites/fox.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('arrow', 'assets/sprites/Arrow.png', { frameWidth : 1024, frameHeight : 1024 })

  }

  create() {

    this.n = 0

    this.add.image(250, 150, 'background').setScale(1.7).setScrollFactor(0)
    this.add.image(250, 150, 'clouds').setScale(1.7).setScrollFactor(0)
    this.add.image(250, 150, 'wood').setScale(1.7).setScrollFactor(0)

    this.collide()
    this.decors = this.add.image(this.PLACEMENT, 151, 'decors')

    this.placeItems()

    this.input.setDefaultCursor("url(../assets/images/aim.png), none");    
    this.pointer = this.add.image(this.input.mousePointer.worldX, this.input.mousePointer.worldY, "aim")
      .setScale(0.2)
      .setScrollFactor(0)
    
    this.wolf = new Enemy(this , "wolf", this.PLACEMENT-1134, 150, 400, {
      pv: 100
    })
    
    this.wolf.setFixedRotation()
    
    this.wolf.anim({
      stand: [400,400],
      left: [384,391],
      right: [400,400],
      jump: 0,
      attack: [4,7],
    })
    
    this.shapes = this.cache.json.get('hitbox_player')

    this.player = this.matter.add.sprite(this.PLACEMENT - 756, 200, 'player', 0, { shape: this.shapes.player })
      .setScale(this.PLAYERSCALE)
      .setCollidesWith([this.platforms])
      .setFixedRotation()

    this.arrow = this.matter.add.sprite(this.player.x, this.player.y, "arrow", 7)
      .setScale(0.03)
      .setCollidesWith([this.platforms])

    this.wolf.look(this.player)

    this.createAnims()

    this.cameras.main.setBounds(0, 0, this.solid.displayWidth, this.solid.displayHeight)
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)

    this.createStoryVariables()

    this.log = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

  }

  update() {
    
    this.target = [Math.round(this.pointer.x + this.cameras.main.scrollX), Math.round(this.pointer.y)]

    this.startStory()
    this.move(false)
    this.arrowfollow()
  }

  move(log) {

  this.cursors = this.input.keyboard.createCursorKeys()
  this.keys = this.input.keyboard.addKeys({
    space: "SPACE",
    keyUp: this.cursors.up,
    keyDown: this.cursors.down,
    keyRight: this.cursors.right,
    keyLeft: this.cursors.left,
    X: "X",
    Z: "Z",
    Q: "Q",
    S: "S",
    D: "D",
    W: "W",
    A: "A"
  })

  this.UP = this.keys.Z // this.keys.keyUp
  this.DOWN = this.keys.S // this.keys.keyDown
  this.LEFT = this.keys.Q // this.keys.keyLeft
  this.RIGHT = this.keys.D // this.keys.keyRight

    if (this.LEFT.isDown && this.UP.isUp) {

      if(log === true) console.log("gauche")
      this.player.anims.play('left', true)
      this.player.setVelocityX(-this.SPEED)

    }
    else if (this.RIGHT.isDown && this.UP.isUp) {

      if(log === true) console.log('droite')
      this.player.anims.play('right', true)
      this.player.setVelocityX(this.SPEED)

    }
    else if (this.RIGHT.isDown && this.UP.isDown && this.LEFT.isUp) {

      if(log === true) console.log('droite haut')
      this.player.anims.play('jump_right', true)
      this.player.setVelocityX(this.SPEED)
      if(this.onGround(this.player)) this.player.setVelocityY(-this.JUMP)
      
    }
    else if (this.LEFT.isDown && this.UP.isDown && this.RIGHT.isUp) {

      if(log === true) console.log('gauche haut')
      this.player.anims.play('jump_left', true)
      this.player.setVelocityX(-this.SPEED)
      if(this.onGround(this.player, this.platforms)) this.player.setVelocityY(-this.JUMP)

    }
    else if (this.UP.isDown && this.LEFT.isUp && this.RIGHT.isUp) {

      if(log === true) console.log('haut')
      if(this.onGround(this.player, this.platforms)) this.player.setVelocityY(-this.JUMP)

    }
    else if (this.keys.X.isDown) {

      this.vars.shoot = true

    }
    else if (this.keys.space.isDown) {
      
      this.dialog.kill()
    
    }
    else { 

      if(this.target[0] < this.player.x) {
        this.player.anims.play('left_stand', true)
      }
      else this.player.anims.play('right_stand', true)
      this.player.setVelocityX(0)
      
    }
  }

  createAnims() {
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 48, end: 55 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right_stand',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'left_stand',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'jump_left',
        frames: this.anims.generateFrameNumbers('player', { start: 56, end: 63 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'jump_right',
        frames: this.anims.generateFrameNumbers('player', { start: 32, end: 41 }),
        frameRate: 10,
        repeat: -1
    })    

    this.anims.create({
        key: 'slash_right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
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

    var shapes = this.cache.json.get('hitbox_ground')
    this.solid = this.matter.add.image(this.PLACEMENT, 245, 'solid', 0, { shape: shapes.solid }).setStatic(true).setCollisionCategory(this.platforms)
    
    this.matter.world.setBounds(0, 0, this.solid.displayWidth, this.solid.displayHeight)

  }

  placeItems() {

    this.items = this.matter.world.nextCategory()

    this.key = this.matter.add.image(this.PLACEMENT, 168, 'key', 0).setStatic(true).setCollisionCategory(this.items).setFixedRotation().setScale(this.ITEMSCALE)
    this.key.visible = false

    this.portal = this.matter.add.image(this.PLACEMENT-680, 223, 'portal', 0).setStatic(true).setCollisionCategory(this.items).setFixedRotation()

    this.chest = this.matter.add.sprite(77, 207, 'chest', 0)
      .setStatic(true)
      .setCollisionCategory(this.items)
    
  }

  startStory() {

    if(this.vars.gameTuto === true) {
      
      if(this.dialog && this.dialog.exists() === 1) this.dialog.kill()
      this.dialog = new Dialog(this, [
        "Mon nom est Aetheris.",
        "Je suis..",
        'Je suis là depuis des années.',
        "Personne n'a rien pu y faire,\nà croire que..",
        "c'était ma destinée.",
        "Bref..",
        "Toi, tu peux faire quelque chose !",
        "Je te guiderai jusqu'à moi.",
        "Je t'attends.",
        "Oh.. avant de partir !"
      ])

      this.time.addEvent({
        delay: 30000,
        callback: () => {
          let USERname = prompt("Quel est ton nom ?")
          document.cookie = `name=${USERname}`
        },
        repeat: 0
      })

      this.vars.gameTuto = false
    
    }

    if(this.isTouching(this.arrow, this.wolf)) this.wolf.damage(5)

    if(this.isInterract(this.chest) && this.vars.firstchestopened === false && this.vars.tutochest === true) {

      if(this.dialog && this.dialog.exists() === 1) this.dialog.kill()
      this.dialog = new Dialog(this, 'Ceci est un coffre.\nPour l\'ouvrir, appuyez sur X.')
      this.vars.tutochest = false

      if(this.player.body.velocity.x !== 0) this.player.setVelocityX(-this.player.body.velocity.x) // inertia patch
    }

    if(this.isInterract(this.portal) && Phaser.Input.Keyboard.JustDown(this.keys.X)) {

      if(this.vars.haskey) {
        
        this.scene.start('Level_2')

      }

      else {
        
        if(this.dialog && this.dialog.exists() === 1) this.dialog.kill()
        this.dialog = new Dialog(this, 'vous avez besoin d\'une clé\npour ouvrir cette porte !')
        
      }

    }

    if(this.vars.firstchestopened === false && this.isInterract(this.chest) && this.keys.X.isDown) {

      this.chest.anims.play('opening_chest', true)
      
      this.vars.firstchestopened = true

      this.key.visible = true
    
    }

    if(this.vars.firstchestopened && this.isInterract(this.key) && Phaser.Input.Keyboard.JustDown(this.keys.X) && this.key.visible) {

      alert('vous obtennez une clé ! ')

      this.key.visible = false
      this.vars.haskey = true

    }

  }

  onGround(sprite) {

    if(sprite.body.velocity.y === 0) return true
    return false

  }

  isInterract(sprite) {

    let diff = this.player.x - sprite.x

    if(diff > -25 && diff < 25) return true
    else return false

  }

  createStoryVariables() {
    
    this.vars = {
      gameTuto : true,
      firstchestopened : false,
      tutochest : true,
      haskey: false,
      just_hit: false,
      shoot: false
    }
    
    if(document.cookie.includes("name")) this.vars.gameTuto = false
  
  }

  returnmatter() {
    return this.matter
  }
  
  arrowfollow() {

    this.log.setText([
        `aim : [${this.target}]`,
        `player : (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`,
    ]);

    this.pointer.x = this.input.x + this.input.x
    this.pointer.y = this.input.y + this.input.y

    if(this.vars.shoot === false) {
      this.arrow.visible = false
      this.arrow.x = this.player.x
      this.arrow.y = this.player.y
    }

    if(this.vars.shoot) {
      this.arrow.visible = true
    }
    
  }

  throwArrow() {
    this.arrow.x = this.player.x
    this.arrow.visible = true

    // https://phaser.io/examples/v3/view/physics/matterjs/body-follow-path
    
  }

  isTouching(sprite1, sprite2) {
    let diff_x = sprite1.x - sprite2.x
    let diff_y = sprite1.y - sprite2.y

    let MIN_X = sprite1.displayWidth / 2
    let MIN_Y = sprite1.displayHeight / 2

    if (diff_x > -MIN_X && diff_x < MIN_X && diff_y > -MIN_Y && diff_y < MIN_Y) return true
    else return false
  }
    
}