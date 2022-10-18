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
let ground;
let cursors;
let enemy;
let score;
let gameOver = false;

const game = new Phaser.Game(config);

function preload () {


    this.load.image("sky", "../assets/sky.png");
    this.load.image("platform", "../assets/platform.png")
    this.load.image("ground", "../assets/ground.png")
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

    enemy = this.physics.add.image(200, 100, "enemy");
    enemy.displayWidth = 48
    enemy.displayHeight = 48

    enemy.setVelocity(100);
    enemy.setBounce(0.2);
    enemy.setCollideWorldBounds(true)

    // Creating the ground
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 590, 'ground').setScale(2).refreshBody();

    // Creating platforms
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    // Creating a player warrior
    player = this.physics.add.sprite(100, 450, 'warrior')
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.displayWidth = 48;
    player.displayHeight = 48;

    // Animations for the player
    this.anims.create(
        {
        key: 'left',
        frames: this.anims.generateframeNumbers('warrior', { start: 35, end: 45}),
        frameRate: 20
    })

    this.anims.create({
        key: 'turn',
        frames: [ { key:'warrior', frame: 42} ],
        frameRate: 20
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateframeNumbers('warrior', { start: 35, end: 45}),
        frameRate: 30
    })

    cursors = this.input.keyboard.createCursorKeys();

    enemy = this.physics.add.group({
        key: 'enemy',
        repeat: 11,
        setXY: { x:12, y: 0, stepX: 70 }
    })

    // Making the player and enemies to collide the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(enemy, platforms);

    this.physics.add.collider(player, enemy, hitEnemy, null, this);
}

function update()
{
    if (gameOver)
    {
        return;
    }

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

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectSomething() {
    console.log("Collected")
}

function hitEnemy() {
    console.log("Hit!")
}