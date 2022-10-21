//Source for 2D models: https://opengameart.org/content/animated-skeleton
//https://opengameart.org/content/animated-warrior


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1100,
        height: 600,
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let platforms;
let lava;
let ground;
let cursors;
let skeleton;
let flag;
let score;
let fireballs;
let jump_sound;
let death_sound;
let soundtrack
let gameOver = false;

const game = new Phaser.Game(config);

function preload () {

    // Textures
    this.load.image("sky", "../assets/sky.png");
    this.load.image("fireball", "../assets/fireball.png");
    this.load.image("moving_platform", "../assets/moving_platform.png");
    this.load.image("flag", "../assets/flag.png");
    this.load.image("platform", "../assets/platform.png");
    this.load.image("wall", "../assets/wall.png");
    this.load.image("ground", "../assets/ground.png");
    this.load.image("lava", "../assets/lava.png");
    this.load.spritesheet({
        key: 'warrior',
        url: '../assets/warrior.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32
        }
    });
    this.load.spritesheet({
        key: 'skeleton',
        url: '../assets/skeleton.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32
        }
    });

    //Sounds
    this.load.audio("jump", "../sounds/jump.mp3");
    this.load.audio("death", "../sounds/death.mp3");
    this.load.audio("soundtrack", "../sounds/soundtrack.mp3");
}

function create () {
    this.add.image(400, 300, "sky");


    // Creating platforms
    let moving_platform = createPlatforms.call(this);

    // Sounds
    jump_sound = this.sound.add("jump");
    death_sound = this.sound.add("death");
    soundtrack = this.sound.add("soundtrack");
    soundtrack.play();
    soundtrack.setVolume(0.1);
    

    // Creating a player warrior
    createPlayer.call(this);

    // Annimations for the player
    createPlayerAnimations.call(this);

    // Creating fireballs
    createFireballs.call(this);
    TimedEvent = this.time.addEvent({ delay: 4000, callback: createFireballs, callbackScope: this, loop: true });

    //setInterval(createFireballs, 2000);

    // Allowing user to control the players
    cursors = this.input.keyboard.createCursorKeys();

    skeleton = this.physics.add.image(275, 0, "skeleton");
    skeleton.displayWidth = 48
    skeleton.displayHeight = 48

    skeleton.setVelocity(25);
    skeleton.setBounce(0.2, 0.2);
    skeleton.setCollideWorldBounds(true)
    skeleton.setSize(20, 32);

    
    // Making the player and enemies to collide the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, ground);
    
    this.physics.add.collider(skeleton, platforms);
    this.physics.add.collider(skeleton, ground);

    this.physics.add.collider(player, this.moving_platform1_s1);


    this.physics.add.collider(player, lava, playerDie, null, this);

    this.physics.add.collider(player, flag, win, null, this);

    this.physics.add.collider(skeleton, lava, hitLavaSkeleton, null, this);

    this.physics.add.collider(player, moving_platform);
}

function update()
{
    playerControl.call(this);
}



function collectSomething() {
    console.log("Collected")
}


function hitskeleton() {
    console.log("Hit!")
}



// Function for creating platforms
function createPlatforms() {
    platforms = this.physics.add.staticGroup();
    lava = this.physics.add.staticGroup();
    flag = this.physics.add.staticGroup();
    let moving_platform1_s1 = this.physics.add.image(70, 580, "moving_platform").setImmovable(true).setVelocity(100, -100);
    moving_platform1_s1.body.setAllowGravity(false);

    this.tweens.timeline({
        targets: moving_platform1_s1.body.velocity,
        loop: -1,
        tweens: [
            { x:    0, y:    0, duration: 1500, ease: 'Stepped' },
            { x:    0, y: -130, duration: 3500, ease: 'Stepped' },
            { x:    0, y:    0, duration: 1500, ease: 'Stepped' },
            { x:    0, y:  130, duration: 3500, ease: 'Stepped' },]
        });

    // Creating the ground
    platforms.create(400, 590, 'ground').setScale(2).refreshBody();

    // Section 1
    wall1_s1 = platforms.create(250, 310, 'wall');
    wall1_s1.setSize(35, 500);
    wall1_s1.displayHeight = 500;

    
    platform1_s1 = platforms.create(200, 445, 'platform');
    platform2_s1 = platforms.create(200, 350, 'platform');
    platform3_s1 = platforms.create(200, 255, 'platform');
    platform4_s1 = platforms.create(200, 160, 'platform');

    // Section 2
    platform1_s2 = platforms.create(600, 440, 'platform');
    platform1_s2.setSize(400, 35);
    platform1_s2.displayWidth = 400;

    lava1_s2 = lava.create(335, 576, 'lava');
    lava1_s2.setSize(150, 35);
    lava1_s2.displayWidth = 150;

    lava2_s2 = lava.create(550, 576, 'lava');
    lava2_s2.setSize(80, 35);
    lava2_s2.displayWidth = 80;

    lava3_s2 = lava.create(700, 576, 'lava');
    lava3_s2.setSize(80, 35);
    lava3_s2.displayWidth = 80;

    lava4_s2 = lava.create(900, 576, 'lava');
    lava4_s2.setSize(80, 35);
    lava4_s2.displayWidth = 200;

    wall1_s2 = platforms.create(450, 180, 'wall');
    wall1_s2.setSize(35, 500);
    wall1_s2.displayHeight = 500;

    wall2_s2 = platforms.create(800, 190, 'wall');
    wall2_s2.setSize(35, 200);
    wall2_s2.displayHeight = 200;

    wall3_s2 = platforms.create(1000, 310, 'wall');
    wall3_s2.setSize(35, 500);
    wall3_s2.displayHeight = 500;

    platform2_s2 = platforms.create(980, 500, 'platform');
    platform2_s2.setSize(10, 35);
    platform2_s2.displayWidth = 10;

    platform3_s2 = platforms.create(510, 200, 'platform');
    platform3_s2.setSize(90, 35);
    platform3_s2.displayWidth = 90;

    dot1_s2 = platforms.create(650, 300, 'platform');
    dot1_s2.setSize(5, 5);
    dot1_s2.displayWidth = 5;
    dot1_s2.displayHeight = 5;

    lava5_s2 = lava.create(592, 433, 'lava');
    lava5_s2.setSize(260, 22);
    lava5_s2.displayWidth = 260;
    lava5_s2.displayHeight = 22;

    wall4_s2 = platforms.create(550, 100, 'wall');
    wall4_s2.setSize(10, 70);
    wall4_s2.displayWidth = 10;
    wall4_s2.displayHeight = 70;

    dot2_s2 = platforms.create(630, 70, 'platform');
    dot2_s2.setSize(10, 10);
    dot2_s2.displayWidth = 10;
    dot2_s2.displayHeight = 10;

    dot2_s2 = platforms.create(710, 70, 'platform');
    dot2_s2.setSize(10, 10);
    dot2_s2.displayWidth = 10;
    dot2_s2.displayHeight = 10;

    dot3_s2 = platforms.create(900, 85, 'platform');
    dot3_s2.setSize(10, 5);
    dot3_s2.displayWidth = 5;
    dot3_s2.displayHeight = 5;

    // Goal
    goal = flag.create(1060, 530, 'flag');
    goal.setSize(20, 20);

    return moving_platform1_s1;
}


// Function for creating players animations
function createPlayerAnimations() {
    this.anims.create(    
        {
        key: 'left',
        frames: this.anims.generateFrameNumbers('warrior', { start: 20, end: 30}),
        frameRate: 20,
        repeat: -1
    })

    this.anims.create({
        key: 'stand',
        frames: this.anims.generateFrameNumbers('warrior', { start: 0, end: 19}),
        frameRate: 20
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('warrior', { start: 20, end: 30}),
        frameRate: 30
    });

    this.anims.create({
        key: 'die',
        frames: this.anims.generateFrameNumbers('warrior', { start: 40, end: 49}),
        frameRate: 30
    });
}


// Function for creating player
function createPlayer() {
    player = this.physics.add.sprite(200, 500, 'warrior')
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    player.displayWidth = 48;
    player.displayHeight = 48;
    player.setSize(15, 32);
}


// Function for controlling and animating player
function playerControl() {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        
        player.anims.play('stand');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-275);

        jump_sound.play();
    }
}

// Function for player dying when hit the lava
function playerDie() {
    player.anims.play('die');

    death_sound.play();
    death_sound.setVolume(0.5);

    soundtrack.stop();
    
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
}

// Skeleton hitting lava to show player that it is dangerous
function hitLavaSkeleton() {
    skeleton.setTint(0xff0000);
    skeleton.setVelocity(0);
}

// Function for winning the game
function win() {
    this.physics.pause();

    player.setTint(0x00ff00);

    gameOver = true;
}

// Function for creating fireballs

function createFireballs() {
    fireballs = this.physics.add.group({
        key: 'fireball',
        repeat: 1,
        setXY: { x: 30, y: 0, stepX: 60 },
        setSize: { x: 100, y: 64 }
    });

    fireballs.setVelocityY(250);

    this.physics.add.collider(player, fireballs, playerDie, null, this);
}
