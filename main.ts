namespace SpriteKind {
    export const BackgroundAnimation = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameBStarted) {
        if (2 > _2jump) {
            PlayerKasper.vy = -160
            PlayerKasper.ay = 250
            _2jump += 1
        }
        if (PlayerKasper.isHittingTile(CollisionDirection.Bottom)) {
            _2jump = 0
            PlayerKasper.vy = -160
            PlayerKasper.ay = 250
            _2jump += 1
        }
    }
})
function SetLayers () {
    PossibleBlockPlacements = []
    GetRandomLayerPos(LayerHeight)
    for (let index = 0; index < NumberOfBlocksInLayer; index++) {
        tiles.setTileAt(tiles.getTileLocation(PossibleBlockPlacements.removeAt(PossibleBlockPlacements.indexOf(PossibleBlockPlacements._pickRandom())), LayerHeight), assets.tile`myTile5`)
    }
    tileUtil.setWalls(assets.tile`myTile5`, true)
    LayerHeight += -3
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(GameBStarted) && !(GameAStarted)) {
        loadingScreen()
        tiles.setCurrentTilemap(tilemap`level`)
        pause(2200)
        PlayerKasper = sprites.create(assets.image`KasperIcon`, SpriteKind.Player)
        PlayerKasper.setStayInScreen(true)
        tiles.placeOnTile(PlayerKasper, tiles.getTileLocation(5, 252))
        scene.cameraFollowSprite(PlayerKasper)
        controller.moveSprite(PlayerKasper, 100, 0)
        LayerHeight = 250
        LavaRow = 255
        info.setScore(0)
        StartGameB()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(GameBStarted) && !(GameAStarted)) {
        loadingScreen()
        tiles.setCurrentTilemap(tilemap`level10`)
        pause(2200)
        StartMode = false
        pause(550)
        GameAStarted = true
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 50, 50)
        scene.cameraFollowSprite(projectile)
        projectile.setStayInScreen(true)
        projectile.setBounceOnWall(true)
        game.splash("KÆRLIGHEDSTEST")
        game.showLongText("Her kan du teste hvor meget din soulmate og du passer sammen<3.", DialogLayout.Center)
        navn1 = game.askForString(navn1, 24)
        navn2 = game.askForString(navn2, 24)
        game.splash(navn1, navn2)
        game.splash(randint(0, 100), "%")
        game.reset()
    }
})
function loadingScreen () {
    LoadingAnimation = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.BackgroundAnimation)
    LoadingAnimation.setPosition(8, 8)
    animation.runImageAnimation(
    LoadingAnimation,
    assets.animation`myAnim`,
    200,
    false
    )
    pause(5000)
}
function StartGameB () {
    GameBStarted = true
    SetLayers()
    while (GameBStarted) {
        pause(1000)
        info.changeScoreBy(1)
        SpawnLava()
        SetLayers()
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 230), assets.tile`Lava`)) {
            SpawnLava()
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 200), assets.tile`Lava`)) {
            SpawnLava()
        }
    }
}
function SpawnLava () {
    for (let index = 0; index <= 15; index++) {
        tiles.setTileAt(tiles.getTileLocation(index, LavaRow), assets.tile`Lava`)
    }
    LavaRow += -1
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Lava`, function (sprite, location) {
    game.gameOver(false)
})
function GetRandomLayerPos (num: number) {
    if (num % 2 == 0) {
        NumberOfBlocksInLayer = 4
        PossibleBlockPlacements = [
        1,
        3,
        5,
        7,
        9,
        11,
        13,
        15
        ]
    } else {
        NumberOfBlocksInLayer = 3
        PossibleBlockPlacements = [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14
        ]
    }
}
let LoadingAnimation: Sprite = null
let navn2 = ""
let navn1 = ""
let projectile: Sprite = null
let LavaRow = 0
let NumberOfBlocksInLayer = 0
let LayerHeight = 0
let PossibleBlockPlacements: number[] = []
let PlayerKasper: Sprite = null
let _2jump = 0
let NewBackGroundRanNum = 0
let BackGroundRanNum = 0
let StartMode = false
let GameBStarted = false
let GameAStarted = false
GameAStarted = false
GameBStarted = false
StartMode = true
while (StartMode) {
    pause(500)
    while (BackGroundRanNum == NewBackGroundRanNum) {
        NewBackGroundRanNum = randint(1, 6)
    }
    BackGroundRanNum = NewBackGroundRanNum
    if (BackGroundRanNum == 1) {
        scene.setBackgroundImage(assets.image`BackGround1AB`)
    } else if (BackGroundRanNum == 2) {
        scene.setBackgroundImage(assets.image`BackGround2AB`)
    } else if (BackGroundRanNum == 3) {
        scene.setBackgroundImage(assets.image`BackGround3AB`)
    } else if (BackGroundRanNum == 4) {
        scene.setBackgroundImage(assets.image`BackGround4AB`)
    } else if (BackGroundRanNum == 5) {
        scene.setBackgroundImage(assets.image`BackGround5AB`)
    } else {
        scene.setBackgroundImage(assets.image`BackGround6AB`)
    }
}
