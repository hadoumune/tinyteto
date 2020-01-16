namespace SpriteKind {
    export const BlockS = SpriteKind.create()
    export const BG = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
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
    `
    //% blockIdentity=images._tile
    export const tile1 = img`
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
    `
    //% blockIdentity=images._tile
    export const tile2 = img`
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
    `
}
function rotateMino (addValue: number) {
    oldMinoDir = MinoDir
    MinoDir = (MinoDir + addValue) % 4
    isMinoOk = fun.checkHitMino(
    Field,
    MinoType,
    MinoDir,
    MinoX,
    MinoY
    )
    if (isMinoOk) {
        MinoDir = oldMinoDir
    }
    applyMino()
}
function writeField () {
    FixMino = fun.writeMino(
    Field,
    MinoType,
    MinoDir,
    MinoX,
    MinoY
    )
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    moveMino(MinoMove)
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    FallCounter = FallCounter + FallTime
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveMino(0 - MinoMove)
})
function initBGM () {
    BGMPart1 = [587, 0, 440, 494, 523, 0, 494, 440, 392, 0, 392, 494, 587, 0, 523, 494, 440, 0, 440, 494, 523, 0, 587, 523, 494, 0, 392, 0, 392, 1]
    BGMPart2 = [523, 0, 659, 784, 0, 698, 659, 587, 0, 587, 494, 587, 0, 523, 494, 440, 0, 440, 494, 523, 0, 587, 0, 494, 0, 392, 0, 392, 1]
    BGM = [BGMPart1, BGMPart2, BGMPart2]
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    FallCounter = FallCounter + FallTime
})
function initField () {
    Field = []
    for (let index = 0; index < 220; index++) {
        Field.push(0)
    }
    BlockSprites = sprites.allOfKind(SpriteKind.BlockS)
    for (let index2 = 0; index2 <= 22; index2++) {
        for (let index3 = 0; index3 <= 10; index3++) {
            BlockSprites.push(sprites.create(BlockImage[7], SpriteKind.BlockS))
            BlockSprites[index3 + index2 * 10].setPosition(68 + index3 * 4, 28 + index2 * 4)
        }
    }
    image.screenImage().drawRect(60, 28, 40, 88, 1)
    BGParts = sprites.allOfKind(SpriteKind.BG)
    BGParts.push(sprites.create(image.create(2, 89), SpriteKind.BlockS))
    BGParts.push(sprites.create(image.create(2, 89), SpriteKind.BlockS))
    BGParts.push(sprites.create(image.create(44, 2), SpriteKind.BlockS))
    for (let value of BGParts) {
        value.image.fill(13)
    }
    BGParts[0].setPosition(58, 65)
    BGParts[1].setPosition(102, 65)
    BGParts[2].setPosition(80, 109)
}
function applyShadow () {
    isShadowMinoOn = false
    ShadowMinoY = MinoY
    while (isShadowMinoOn == false) {
        ShadowMinoY = ShadowMinoY + MinoMove
        isShadowMinoOn = fun.checkHitMino(
        Field,
        MinoType,
        MinoDir,
        MinoX,
        ShadowMinoY
        )
        if (isShadowMinoOn) {
            ShadowMinoY = ShadowMinoY - MinoMove
        }
        ShadowMino.setPosition(MinoX, ShadowMinoY)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateMino(3)
})
function applyMino () {
    Mino.setImage(Minos[MinoDir][MinoType])
    ShadowMino.setImage(Minos[MinoDir][MinoType])
    applyShadow()
}
function initMinos () {
    Minos0 = [img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
   `, img`
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        7 7 7 7 7 7 7 7 7 7 7 7 . . . .
        7 . . 7 7 . . 7 7 . . 7 . . . .
        7 . . 7 7 . . 7 7 . . 7 . . . .
        7 7 7 7 7 7 7 7 7 7 7 7 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . 4 4 4 4 . . . . . . . .
        . . . . 4 . . 4 . . . . . . . .
        . . . . 4 . . 4 . . . . . . . .
        . . . . 4 4 4 4 . . . . . . . .
        . . . . 4 4 4 4 . . . . . . . .
        . . . . 4 . . 4 . . . . . . . .
        . . . . 4 . . 4 . . . . . . . .
        . . . . 4 4 4 4 . . . . . . . .
        . . . . 4 4 4 4 4 4 4 4 . . . .
        . . . . 4 . . 4 4 . . 4 . . . .
        . . . . 4 . . 4 4 . . 4 . . . .
        . . . . 4 4 4 4 4 4 4 4 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . 3 3 3 3 . . . .
        . . . . . . . . 3 . . 3 . . . .
        . . . . . . . . 3 . . 3 . . . .
        . . . . . . . . 3 3 3 3 . . . .
        . . . . . . . . 3 3 3 3 . . . .
        . . . . . . . . 3 . . 3 . . . .
        . . . . . . . . 3 . . 3 . . . .
        . . . . . . . . 3 3 3 3 . . . .
        . . . . 3 3 3 3 3 3 3 3 . . . .
        . . . . 3 . . 3 3 . . 3 . . . .
        . . . . 3 . . 3 3 . . 3 . . . .
        . . . . 3 3 3 3 3 3 3 3 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . 5 5 5 5 . . . . . . . .
        . . . . 5 . . 5 . . . . . . . .
        . . . . 5 . . 5 . . . . . . . .
        . . . . 5 5 5 5 . . . . . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . . . . . 5 5 5 5 . . . .
        . . . . . . . . 5 . . 5 . . . .
        . . . . . . . . 5 . . 5 . . . .
        . . . . . . . . 5 5 5 5 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . 9 9 9 9 . . . .
        . . . . . . . . 9 . . 9 . . . .
        . . . . . . . . 9 . . 9 . . . .
        . . . . . . . . 9 9 9 9 . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 9 9 9 . . . . . . . .
        . . . . 9 . . 9 . . . . . . . .
        . . . . 9 . . 9 . . . . . . . .
        . . . . 9 9 9 9 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `]
    Minos1 = [img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 . . 8 8 . . 8 8 . . 8 8 . . 8
        8 . . 8 8 . . 8 8 . . 8 8 . . 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 7 7 7 7 7 7 7 . . . .
        . . . . 7 . . 7 7 . . 7 . . . .
        . . . . 7 . . 7 7 . . 7 . . . .
        . . . . 7 7 7 7 7 7 7 7 . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 4 4 4 4 4 4 4 4 4 4 4 4
        . . . . 4 . . 4 4 . . 4 4 . . 4
        . . . . 4 . . 4 4 . . 4 4 . . 4
        . . . . 4 4 4 4 4 4 4 4 4 4 4 4
        . . . . 4 4 4 4 . . . . . . . .
        . . . . 4 . . 4 . . . . . . . .
        . . . . 4 . . 4 . . . . . . . .
        . . . . 4 4 4 4 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 3 3 3 3 . . . . . . . .
        . . . . 3 . . 3 . . . . . . . .
        . . . . 3 . . 3 . . . . . . . .
        . . . . 3 3 3 3 . . . . . . . .
        . . . . 3 3 3 3 3 3 3 3 3 3 3 3
        . . . . 3 . . 3 3 . . 3 3 . . 3
        . . . . 3 . . 3 3 . . 3 3 . . 3
        . . . . 3 3 3 3 3 3 3 3 3 3 3 3
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . 5 5 5 5 5 5 5 5
        . . . . . . . . 5 . . 5 5 . . 5
        . . . . . . . . 5 . . 5 5 . . 5
        . . . . . . . . 5 5 5 5 5 5 5 5
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . . . . . 9 9 9 9 9 9 9 9
        . . . . . . . . 9 . . 9 9 . . 9
        . . . . . . . . 9 . . 9 9 . . 9
        . . . . . . . . 9 9 9 9 9 9 9 9
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `]
    Minos2 = [img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 . . 8 . . . . . . . .
        . . . . 8 8 8 8 . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        7 7 7 7 7 7 7 7 7 7 7 7 . . . .
        7 . . 7 7 . . 7 7 . . 7 . . . .
        7 . . 7 7 . . 7 7 . . 7 . . . .
        7 7 7 7 7 7 7 7 7 7 7 7 . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 4 4 4 4 4 4 4 4 . . . .
        . . . . 4 . . 4 4 . . 4 . . . .
        . . . . 4 . . 4 4 . . 4 . . . .
        . . . . 4 4 4 4 4 4 4 4 . . . .
        . . . . . . . . 4 4 4 4 . . . .
        . . . . . . . . 4 . . 4 . . . .
        . . . . . . . . 4 . . 4 . . . .
        . . . . . . . . 4 4 4 4 . . . .
        . . . . . . . . 4 4 4 4 . . . .
        . . . . . . . . 4 . . 4 . . . .
        . . . . . . . . 4 . . 4 . . . .
        . . . . . . . . 4 4 4 4 . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 3 3 3 3 3 3 3 3 . . . .
        . . . . 3 . . 3 3 . . 3 . . . .
        . . . . 3 . . 3 3 . . 3 . . . .
        . . . . 3 3 3 3 3 3 3 3 . . . .
        . . . . 3 3 3 3 . . . . . . . .
        . . . . 3 . . 3 . . . . . . . .
        . . . . 3 . . 3 . . . . . . . .
        . . . . 3 3 3 3 . . . . . . . .
        . . . . 3 3 3 3 . . . . . . . .
        . . . . 3 . . 3 . . . . . . . .
        . . . . 3 . . 3 . . . . . . . .
        . . . . 3 3 3 3 . . . . . . . .
   `, img`
        . . . . 5 5 5 5 . . . . . . . .
        . . . . 5 . . 5 . . . . . . . .
        . . . . 5 . . 5 . . . . . . . .
        . . . . 5 5 5 5 . . . . . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . . . . . 5 5 5 5 . . . .
        . . . . . . . . 5 . . 5 . . . .
        . . . . . . . . 5 . . 5 . . . .
        . . . . . . . . 5 5 5 5 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . 9 9 9 9 . . . .
        . . . . . . . . 9 . . 9 . . . .
        . . . . . . . . 9 . . 9 . . . .
        . . . . . . . . 9 9 9 9 . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 9 9 9 . . . . . . . .
        . . . . 9 . . 9 . . . . . . . .
        . . . . 9 . . 9 . . . . . . . .
        . . . . 9 9 9 9 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `]
    Minos3 = [img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 . . 2 2 . . 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        8 . . 8 8 . . 8 8 . . 8 8 . . 8
        8 . . 8 8 . . 8 8 . . 8 8 . . 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        7 7 7 7 7 7 7 7 . . . . . . . .
        7 . . 7 7 . . 7 . . . . . . . .
        7 . . 7 7 . . 7 . . . . . . . .
        7 7 7 7 7 7 7 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 . . 7 . . . . . . . .
        . . . . 7 7 7 7 . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . 4 4 4 4 . . . .
        . . . . . . . . 4 . . 4 . . . .
        . . . . . . . . 4 . . 4 . . . .
        . . . . . . . . 4 4 4 4 . . . .
        4 4 4 4 4 4 4 4 4 4 4 4 . . . .
        4 . . 4 4 . . 4 4 . . 4 . . . .
        4 . . 4 4 . . 4 4 . . 4 . . . .
        4 4 4 4 4 4 4 4 4 4 4 4 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        3 3 3 3 3 3 3 3 3 3 3 3 . . . .
        3 . . 3 3 . . 3 3 . . 3 . . . .
        3 . . 3 3 . . 3 3 . . 3 . . . .
        3 3 3 3 3 3 3 3 3 3 3 3 . . . .
        . . . . . . . . 3 3 3 3 . . . .
        . . . . . . . . 3 . . 3 . . . .
        . . . . . . . . 3 . . 3 . . . .
        . . . . . . . . 3 3 3 3 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . 5 5 5 5 5 5 5 5
        . . . . . . . . 5 . . 5 5 . . 5
        . . . . . . . . 5 . . 5 5 . . 5
        . . . . . . . . 5 5 5 5 5 5 5 5
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 . . 5 5 . . 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
   `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 . . 9 9 . . 9 . . . .
        . . . . 9 9 9 9 9 9 9 9 . . . .
        . . . . . . . . 9 9 9 9 9 9 9 9
        . . . . . . . . 9 . . 9 9 . . 9
        . . . . . . . . 9 . . 9 9 . . 9
        . . . . . . . . 9 9 9 9 9 9 9 9
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `]
    Minos = [Minos0, Minos1, Minos2, Minos3]
    BlockImage = [image.create(4, 4), image.create(4, 4), image.create(4, 4), image.create(4, 4), image.create(4, 4), image.create(4, 4), image.create(4, 4), image.create(4, 4)]
    BlockColor = [2, 8, 7, 4, 3, 5, 9, 0]
    tempIndex = 0
    for (let value2 of BlockImage) {
        value2.drawLine(0, 0, 3, 0, BlockColor[tempIndex])
        value2.drawLine(0, 0, 0, 3, BlockColor[tempIndex])
        value2.drawLine(0, 3, 3, 3, BlockColor[tempIndex])
        value2.drawLine(3, 0, 3, 3, BlockColor[tempIndex])
        tempIndex += 1
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    rotateMino(1)
})
function createMino () {
    MinoType = Math.randomRange(0, Minos0.length - 1)
    MinoDir = Math.randomRange(0, 3)
    FallTime = 60
    MinoY = 20
    MinoX = 76
    MinoMove = 4
    Mino.setPosition(MinoX, MinoY)
    applyMino()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveMino(MinoMove)
})
function fastFall () {
    isMinoOn = false
    while (isMinoOn == false) {
        MinoY = MinoY + MinoMove
        isMinoOn = fun.checkHitMino(
        Field,
        MinoType,
        MinoDir,
        MinoX,
        MinoY
        )
        if (isMinoOn) {
            MinoY = MinoY - MinoMove
            Mino.setPosition(MinoX, MinoY)
            FallCounter = FallTime
        } else {
            Mino.setPosition(MinoX, MinoY)
        }
    }
}
function applyFieldSprite () {
    for (let index22 = 0; index22 <= 16; index22++) {
        if (FixMino[index22] != 0) {
            BlockPos = fun.calcBlockPos(
            Field,
            MinoX,
            MinoY,
            index22
            )
            BlockIndex = BlockPos[3] * 10 + BlockPos[2]
            BlockSprites[BlockIndex].setImage(BlockImage[MinoType])
        }
    }
}
function playBGMPart () {
    bgmIndex = 0
    oldBGMIndex = 0
    while (bgmIndex >= oldBGMIndex) {
        curTone = BGMSrc[bgmIndex]
        nextTone = BGMSrc[(bgmIndex + 1) % BGMSrc.length]
        oldBGMIndex = bgmIndex
        bgmIndex = (bgmIndex + 1) % BGMSrc.length
        if (1 < nextTone) {
            music.playTone(curTone, music.beat(BeatFraction.Half))
        } else if (1 == nextTone) {
            music.playTone(curTone, music.beat(BeatFraction.Double))
            bgmIndex = (bgmIndex + 1) % BGMSrc.length
        } else {
            music.playTone(curTone, music.beat(BeatFraction.Whole))
            bgmIndex = (bgmIndex + 1) % BGMSrc.length
        }
    }
}
function moveMino (addValue: number) {
    MinoX = MinoX + addValue
    isMinoOk = fun.checkHitMino(
    Field,
    MinoType,
    MinoDir,
    MinoX,
    MinoY
    )
    if (isMinoOk) {
        MinoX = MinoX - addValue
    }
    Mino.setPosition(MinoX, MinoY)
    applyMino()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    fastFall()
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    moveMino(0 - MinoMove)
})
let nextTone: number = 0
let BGMSrc: number[] = []
let curTone: number = 0
let oldBGMIndex: number = 0
let bgmIndex: number = 0
let BlockIndex: number = 0
let BlockPos: number[] = []
let isMinoOn = false
let tempIndex: number = 0
let BlockColor: number[] = []
let Minos3: Image[] = []
let Minos2: Image[] = []
let Minos1: Image[] = []
let Minos0: Image[] = []
let Minos: Image[][] = []
let ShadowMinoY: number = 0
let isShadowMinoOn = false
let BGParts: Sprite[] = []
let BlockImage: Image[] = []
let BlockSprites: Sprite[] = []
let BGM: number[][] = []
let BGMPart2: number[] = []
let BGMPart1: number[] = []
let FallTime: number = 0
let FallCounter: number = 0
let MinoMove: number = 0
let FixMino: number[] = []
let MinoY: number = 0
let MinoX: number = 0
let MinoType: number = 0
let Field: number[] = []
let MinoDir: number = 0
let oldMinoDir: number = 0
let ShadowMino: Sprite = null
let Mino: Sprite = null
let isMinoOk = false
scene.setBackgroundColor(1)
let Icon = sprites.create(img`
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . 2 . . 2 2 2 2 2 2 . . . . . . . . . . . . . . . .
    . . . . . . 2 2 . 2 2 2 2 2 2 2 2 . . . . . . . . . . . . . . .
    . . . . . . . . 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . . . .
    . . . . . . . . 2 2 2 . 2 2 2 2 2 2 2 . . . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . .
    . . . . . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . 2 . . . . . .
    . . . . . 2 . 2 . . . . 2 . . . . . . 2 . . . . 2 2 2 2 . . . .
    . . . . . 2 . . 2 . . . 2 2 . . . . 2 . . . . . . . 2 . . . . .
    . . . . 2 . . . 2 . . . 2 . 2 . . 2 . . 2 . . . . 2 2 2 . . . .
    . . . . 2 . . . . 2 . . 2 . . . . 2 2 2 2 2 . . 2 . 2 . 2 . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
Icon.setPosition(80, 60)
pause(2000)
Icon.destroy()
scene.setBackgroundColor(15)
isMinoOk = false
initBGM()
initMinos()
Mino = sprites.create(img`
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
`, SpriteKind.Player)
ShadowMino = sprites.create(img`
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
    . . . . . . . . . . 3 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Enemy)
createMino()
initField()
game.onUpdate(function () {
    FallCounter = FallCounter + 1
    if (FallTime <= FallCounter) {
        FallCounter = 0
        MinoY = MinoY + MinoMove
        isMinoOn = fun.checkHitMino(
        Field,
        MinoType,
        MinoDir,
        MinoX,
        MinoY
        )
        if (isMinoOn) {
            MinoY = MinoY - MinoMove
            Mino.setPosition(MinoX, MinoY)
            writeField()
            applyFieldSprite()
            createMino()
        } else {
            Mino.setPosition(MinoX, MinoY)
        }
    }
})
forever(function () {
    for (let value3 of BGM) {
        BGMSrc = value3
        playBGMPart()
    }
})
