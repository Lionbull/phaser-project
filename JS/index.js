//Source for 2D models: https://opengameart.org/content/animated-skeleton
//https://opengameart.org/content/animated-warrior


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
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
let enemy;
let score;

const game = new Phaser.Game(config);

function preload () {


    this.load.image("sky", "../assets/sky.png");
    this.load.image("platform", "../assets/platform.png")
    this.load.image("ground", "../assets/ground.png")
    this.load.spritesheet({
        key: 'player',
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

    enemy = this.physics.add.image(200, 100, "enemy");
    enemy.displayWidth = 48
    enemy.displayHeight = 48

    enemy.setVelocity(100);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true)

    // Creating the ground
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 590, 'ground');

    // Creating platforms
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    // Creating a player warrior
    player = this.physics.add.sprite(100, 450, 'player')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.displayWidth = 48;
    player.displayHeight = 48;


    // Making the player and enemies to collide the platforms
    this.physics.add.collider(player, ground);
    this.physics.add.collider(enemy, ground);

    // Animations for the player
    this.anims.create(
        {
        key: 'left',
        frames: this.anims.generateframeNumbers('player', { start: 35, end: 3})
    })
    
}

function update() {
    
}