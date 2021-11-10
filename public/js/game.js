//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 2.5,
  debug: true,
  clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 75
const JUMP_FORCE = 115
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 1000
let stage = 0


// Game logic

let isJumping = true

loadRoot('https://i.imgur.com/')
loadSprite("bg", "dUL0DkQ.png");
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'qZqED8a.png')
loadSprite('evil-shroom-1', '7HIkNtO.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'dCENbFn.png')
loadSprite('moon-dirt', 'mLMj9pH.png')
loadSprite('mario', 'licxP3b.png')
loadSprite('astro-left', '1gCG7vl.png')
loadSprite('astro-right', 'n9fjg9T.png')
loadSprite('underground', 'lh27PTB.png')




loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('blue-surprise', 'RMqCc1G.png')


loadSprite('entrance high continued', 'FU97gZH.png')
loadSprite('entrance low continued', 'UzgfmRC.png')
loadSprite('windowup', '9gnEC69.png')

loadSprite('windowdown', 'YN8Zjiu.png')
loadSprite('engine', '1RcpW6K.png')

loadSprite('booster-right', 'uB2cD0k.png')
loadSprite('booster-middle', '0qyflwJ.png')
loadSprite('booster-left', 'dqR8UMo.png')
loadSprite('booster-up', 'OxFDPyI.png')
loadSprite('cockpit-left', 'QORMmgl.png')
loadSprite('cockpit-right', 'BB4zjRm.png')
loadSprite('cockpit-center', 'fsWJZRn.png')
loadSprite('entrance-up', '1QlytE0.png')
loadSprite('entrance-down', 'CpcIkqE.png')
loadSprite('lava', 'gYsLAxi.png')
loadSprite('wall-start', 'dCENbFn.png')
loadSprite('wall-end', 'dCENbFn.png')
loadSprite('platform', 'SRQp49D.png')
loadSprite('carl-c', 'n5QOtJb.png')
loadSprite('carl-a', 'XjPYb4J.png')
loadSprite('carl-r', 'SFajSsX.png')
loadSprite('carl-l', 'FhdySPY.png')

scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  add([
    pos(-500, -200),
    sprite("bg", {width: width(), height: height()})
  ]);

  const maps = [
    [
      '        i                                             ',
      '        b                                             ==========',
      '        c                                             ==========',
      '=====   a                                              =========',
      '=====   r                                               ========',
      '=====  nld        %=%=%=                                  ======',
      '=====  bbb                                                 =====',
      '=====  g|j                                     o[>[[[[>[[[[>[===',
      '=====  bbb -                   ^+              p]<]]]]<]]]]<]===',
      '=====  000 ======================~~~~~==========================',
      '============.=.........=.........~~~~~..........................',
      '..............=.........=........,,,,,.........................',
      '........========.....=====.......,,,,,.........................',
      '..............=.........=......................................',
      '================================================================='
   
    ],
    [
      '.....       ...................................................',
      '......      ...................................................',
      '.......-.mm.....................................................',
      '........   .~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~o[>]]~~~~~',
      '.....~~.   .~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~p]<[[~~~~~',
      '.....~~.   ~~~~~~~~~~~~~~.~~~~~~~.~~~............................',
      '.....~~.   ~~~~~~.~~~.~~~.~~~.~~~.~~.............................',
      '.....~~    .~~.~~.~~~.~~~.~~~.~~~.~~.............................',
      '.......---..,,.,,.,,,.,,,.,,,.,,,.,,.............................',
      '................................................................',
      '................................................................',
     ,
    ]
  ]

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid(), 'solid'],
    '~': [sprite('underground')],
    '.': [sprite('moon-dirt'), solid(), 'solid'],
    '+': [sprite('wall-start'), solid(), 'wall-start'],
    '-': [sprite('wall-end'), solid(), 'wall-end'],
    
    '$': [sprite('coin'), 'coin', body()],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    'v': [sprite('unboxed'), solid()],
    '^': [sprite('evil-shroom'), solid(), body(), 'dangerous'],
    '£': [sprite('evil-shroom-1'), solid(), body(), 'dangerous-1'],
   

 
    ']': [sprite('entrance low continued'), solid(), scale(0.5)],
    '[': [sprite('entrance high continued'), solid(), scale(0.5)],
    '>': [sprite('windowup'), solid(), scale(0.5)],
    '<': [sprite('windowdown'), solid(), scale(0.5)],
    '0': [sprite('engine'), scale(0.5)],
    'j': [sprite('booster-right'), scale(0.5)],
    '|': [sprite('booster-middle'), scale(0.5)],
    'g': [sprite('booster-left'), scale(0.5)],
    'b': [sprite('booster-up'), scale(0.5)],
    'n': [sprite('cockpit-left'), scale(0.5)],
    'i': [sprite('cockpit-center'), scale(0.5)],
    'd': [sprite('cockpit-right'), scale(0.5)],
    'o': [sprite('entrance-up'), solid(), scale(0.5), 'entrance'],
    'p': [sprite('entrance-down'), solid(), scale(0.5), 'entrance'],
    ',': [sprite('lava'), solid(), scale(0.5), 'lava'],
    'm': [sprite('platform'), solid(), scale(0.5), 'platform'],

    'c': [sprite('carl-c'), scale(0.5)],
    'a': [sprite('carl-a'), scale(0.5)],
    'r': [sprite('carl-r'), scale(0.5)],
    'l': [sprite('carl-l'), scale(0.5)],

  }

  const gameLevel = addLevel(maps[level], levelCfg)

  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer('ui'),
    {
      value: score,
    }
  ])


  add([text('Made By CARL GRIMALDI'), pos(400, 70)])
  
  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(2)
        timer = time
        isBig = true     
      }
    }
  }

  const player = add([
    sprite('mario'), solid(),

    pos(200, 0),
    {
      dir: vec2(-1, 0),
      dead: false,
      speed: 240,
    },
    body(),
    big(),
    origin('center'),
    
    
  
  ])


  
  action('mushroom', (m) => {
    m.move(20, 0)
  })

  gravity(150)


  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0,0))
    }
  })

  player.collides('mushroom', (m) => {
    destroy(m)
    player.biggify(6)
  })



  player.collides('platform', (p) => {
    action('platform', (p) => {
      splatformspeed=platformspeed/-1.34
      p.move(0, platformspeed)
    })
  })

  collides('platform', 'wall-end', (p) => {
    action('platform', (p) => {
      platformspeed = platformspeed/-1.34
      p.move(0, platformspeed)
    })
  })
    
  
  let speed = 45
  let speed1 = -45
  let platformspeed = 10
  
    

  collides('dangerous', 'wall-start', (d) => {
    speed=speed/-1.34
    action('dangerous', (d) => {

      d.move(speed, 0)
    })
  })

  collides('dangerous', 'wall-end', (d) => {
    speed = speed/-1.34
    action('dangerous', (d) => {
      d.move(speed, 0)
    })
  })
  collides('dangerous-1', 'wall-start', (d) => {
    speed1=speed1/-1.34
    action('dangerous-1', (d) => {
  
      d.move(speed1, 0)
    })
  })

  collides('dangerous-1', 'wall-end', (d) => {
    speed1 = speed1/-1.34
    action('dangerous-1', (d) => {
      d.move(speed1, 0)
    })
  })





  player.collides('dangerous', (d) => {
      go('game',{
        level: (level) % maps.length,
        score: scoreLabel.value
      })
  })

  player.collides('dangerous-1', (d) => {

      go('game',{
        level: (level) % maps.length,
        score: scoreLabel.value
      })
    
  })
  player.collides('lava', (d) => {
      go('game',{
        level: (level) % maps.length,
        score: scoreLabel.value
      })
  })
 
  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('game', { score: scoreLabel.value})
    }
  })

  player.collides('entrance', () => {
    stage = stage + 1
  
      
    if (stage==1){
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value
      })
    }
    if (level==1){
      location.replace("https://www.carlgrimaldi.com/index.html")
    }

  })
  keyDown('up', () => {
    player.changeSprite('mario')
  })

  keyDown('down', () => {
      console.log(player.move);
    player.changeSprite('mario')
  })
  keyDown('right', () => {
    console.log(player.move);
    player.move(MOVE_SPEED, 0)
    player.changeSprite('astro-right')
  })

  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0) 
    player.changeSprite('astro-left')
  })

  player.action(() => {
    if(player.grounded()) {
      isJumping = true
    }
  })
  console.log(player.move);

  keyPress('up', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })
})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)])
})

start("game", { level: 0, score: 0})
