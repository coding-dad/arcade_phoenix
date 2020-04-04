namespace SpriteKind {
    export const MeinProjektil = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    if (controller.left.isPressed() || controller.left.isPressed()) {
        MeinSchiff.setVelocity(0, 0)
    }
})
sprites.onOverlap(SpriteKind.MeinProjektil, SpriteKind.Enemy, function (sprite, otherSprite) {
    MeinSchussAktiv = 0
    sprite.destroy()
    Liste_der_Feinde.removeAt(Liste_der_Feinde.indexOf(otherSprite))
otherSprite.destroy()
    music.magicWand.play()
    if (Liste_der_Feinde.length == 0) {
        pause(100)
        game.over(true)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MeinSchiff.setVelocity(-40, 0)
})
function initFeinde () {
    Richtung = 10
    Feindschiff_x = Richtung
    Feindschiff_y = 10
    Liste_der_Feinde = sprites.allOfKind(SpriteKind.Enemy)
    for (let Index = 0; Index <= 4; Index++) {
        Feindschiff = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . 2 2 2 2 2 2 . . . . 
. . . . . 2 2 4 4 2 2 2 2 . . . 
. . . . . c 4 2 2 2 2 2 c . . . 
. . . . 2 c 4 2 2 2 2 2 c 2 . . 
. . . e 2 c 4 2 2 2 2 2 c 2 e . 
. . . f 2 c 4 2 2 2 2 2 c 2 f . 
. . . f e c 2 2 2 2 2 2 c e f . 
. . . f 2 c 2 b b b b 2 c 2 f . 
. . . e 2 2 b c c c c b 2 2 e . 
. . . e e b c c c c c c b e e . 
. . . f e 4 4 4 4 4 4 4 4 e f . 
. . . f e d 2 2 2 2 2 2 d e f . 
. . . . 2 d d 2 2 2 2 d d 2 f . 
. . . . f 2 d 2 2 2 2 d 2 f . . 
. . . . . e 2 2 2 2 2 2 e . . . 
`, SpriteKind.Enemy)
        Feindschiff.setPosition(Feindschiff_x + 20 * Index, Feindschiff_y)
        Liste_der_Feinde.push(Feindschiff)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MeinSchussAktiv == 0) {
        MeinSchuss = sprites.create(img`
8 8 
8 8 
8 8 
8 8 
8 8 
8 8 
8 8 
8 8 
`, SpriteKind.MeinProjektil)
        MeinSchussAktiv = 1
        MeinSchuss.setPosition(MeinSchiff.x, MeinSchiff.y - 20)
        MeinSchuss.setVelocity(0, -50)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    MeinSchiff.setVelocity(40, 0)
})
function schiesseVielleicht (Feind: Sprite) {
    if (Math.randomRange(0, 30) == 6) {
        Schuss = sprites.create(img`
2 2 
2 2 
2 2 
2 2 
2 2 
2 2 
2 2 
2 2 
`, SpriteKind.Projectile)
        Schuss.setPosition(Feind.x, Feind.y + 20)
        Schuss.setVelocity(0, 50)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false)
})
let _indexFeind: Sprite = null
let Schuss: Sprite = null
let MeinSchuss: Sprite = null
let Feindschiff: Sprite = null
let Feindschiff_y = 0
let Feindschiff_x = 0
let Richtung = 0
let MeinSchussAktiv = 0
let MeinSchiff: Sprite = null
let Liste: number[] = []
let Liste_der_Feinde: Sprite[] = []
MeinSchiff = sprites.create(img`
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c b . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . c 6 . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . 8 6 . . . . . . . 
. . . . . . 8 8 9 8 . . . . . . 
. . . . . . 8 6 9 8 . . . . . . 
. . . . . c c c 8 8 8 . . . . . 
. . . . 8 8 6 6 6 9 8 8 . . . . 
. . 8 f f f c c e e f f 8 8 . . 
. 8 8 8 8 8 8 6 6 6 6 9 6 8 8 . 
8 8 8 8 8 8 8 8 6 6 6 9 6 6 8 8 
8 8 8 8 8 8 8 8 6 6 6 6 9 6 8 8 
`, SpriteKind.Player)
MeinSchiff.setPosition(scene.screenWidth() / 2, 108)
MeinSchiff.setFlag(SpriteFlag.StayInScreen, true)
MeinSchussAktiv = 0
initFeinde()
game.onUpdateInterval(200, function () {
    Feindschiff_x += Richtung
    for (let Index2 = 0; Index2 <= Liste_der_Feinde.length - 1; Index2++) {
        _indexFeind = Liste_der_Feinde[Index2]
        _indexFeind.setPosition(Feindschiff_x + 20 * Index2, Feindschiff_y)
        if (_indexFeind.x >= scene.screenWidth() || _indexFeind.x <= 0) {
            Feindschiff_y += 10
            Richtung = Richtung * -1
        }
        if (_indexFeind.y >= scene.screenHeight()) {
            game.over(false)
        }
        schiesseVielleicht(_indexFeind)
    }
})
game.onUpdate(function () {
    if (MeinSchussAktiv == 1 && MeinSchuss.y <= 1) {
        MeinSchuss.destroy()
        MeinSchussAktiv = 0
    }
})
