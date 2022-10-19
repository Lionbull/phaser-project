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
let enemy;
let score;
let gameOver = false;

const game = new Phaser.Game(config);

function preload () {


    this.load.image("sky", "../assets/sky.png");
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
        key: 'enemy',
        url: '../assets/skeleton.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32
        }
    });
}

function create () {
    this.add.image(400, 300, "sky");

    // Creating platforms
    createPlatforms.call(this);
    

    // Creating a player warrior
    createPlayer.call(this);

    // Annimations for the player
    createPlayerAnimations.call(this);

    // Allowing user to control the players
    cursors = this.input.keyboard.createCursorKeys();


    enemy = this.physics.add.image(200, 100, "enemy");
    enemy.displayWidth = 48
    enemy.displayHeight = 48

    enemy.setVelocity(200);
    enemy.setBounce(1, 0.2);
    enemy.setCollideWorldBounds(true)
    enemy.setSize(20, 32);

    
    // Making the player and enemies to collide the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, ground);
    
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(enemy, ground);

    this.physics.add.collider(player, lava, hitLava, null, this);
    
}

function update()
{
    playerControl.call(this);
}



function collectSomething() {
    console.log("Collected")
}


function hitEnemy() {
    console.log("Hit!")
}



// Function for creating platforms
function createPlatforms() {
    platforms = this.physics.add.staticGroup();
    lava = this.physics.add.staticGroup();
    
    // Creating the ground
    platforms.create(400, 590, 'ground').setScale(2).refreshBody();

    // Section 1
    wall1_s1 = platforms.create(250, 310, 'wall');
    wall1_s1.setSize(35, 500);
    wall1_s1.displayHeight = 500;

    platform2_s1 = platforms.create(200, 250, 'platform');
    platform2_s1 = platforms.create(200, 450, 'platform');
    platform2_s1 = platforms.create(200, 250, 'platform');

    platform3_s1 = platforms.create(50, 350, 'platform');

    platform4_s1 = platforms.create(50, 150, 'platform');

    // Section 2
    platform1_s2 = platforms.create(600, 440, 'platform');
    platform1_s2.setSize(400, 35);
    platform1_s2.displayWidth = 400;

    lava1_s2 = lava.create(335, 576, 'lava');
    lava1_s2.setSize(170, 35);
    lava1_s2.displayWidth = 170;

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

    lava5_s2 = lava.create(592, 434, 'lava');
    lava5_s2.setSize(260, 20);
    lava5_s2.displayWidth = 260;
    lava5_s2.displayHeight = 20;

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
    player = this.physics.add.sprite(300, 0, 'warrior')
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
    }
}

// Function for player dying when hit the lava
function hitLava() {
    player.anims.play('die');
    
    this.physics.pause();

    player.setTint(0xff0000);

    gameOver = true;

    this.input.on("pointerdown", () => preload());
}
