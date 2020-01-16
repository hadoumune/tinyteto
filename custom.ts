namespace fun {
    let minos0 = [
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
        ],
        [
            0, 1, 0, 0,
            1, 1, 1, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
        ],
    ]

    let minos1 = [
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 1,
            0, 1, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 1,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 0, 1, 1,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 1,
            0, 0, 0, 0,
        ],
    ]

    let minos2 = [
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
        ],
        [
            0, 0, 0, 0,
            1, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
        ],
        [
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
        ],
    ]

    let minos3 = [
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 1, 0, 0,
            1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 0, 1, 0,
            1, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            1, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 0, 1, 1,
            0, 1, 1, 0,
            0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 1,
            0, 0, 0, 0,
        ],
    ]
    let fw = 10
    let fh = 22
    let minoSize = 4
    let minoOffX = 80 - ((minoSize * ((fw / 2)-2)))
    let minoOffY = minoSize * (5 + 2)

    let minos = [minos0, minos1, minos2, minos3]
    function getField(field: number[],ix: number, iy: number): number{
        if (ix < 0 || ix >= fw) return 1
        if (iy >= fh) return 1
        if (iy < 0) return 0
        
        return field[iy * fw+ix]
    }
    function setField(field: number[], ix: number, iy: number, value:number): void {
        if (ix < 0 || ix >= fw) return
        if (iy < 0 || iy >= fh) return

        field[iy * fw + ix] = value
    }
    /**
    * check field and minoState
    */
    //% block
    export function checkHitMino(field : number[], minoType: number, minoDir: number, minoPosX: number, minoPosY:number ): boolean {
        let mino = minos[minoDir][minoType]
        let minoX = (minoPosX - minoOffX)/minoSize
        let minoY = (minoPosY - minoOffY)/minoSize
        for ( let y=0; y<4 ; y++ ){
            let fy = minoY + y
            for (let x=0; x<4; x++) {
                let fx = minoX + x
                let f = getField(field,fx,fy)
                if ( f != 0 && mino[y*4+x] != 0 ){
                    return true
                }
            }
        }
        return false
    }
    //% block
    export function checkOnMino(field: number[], minoType: number, minoDir: number, minoPosX: number, minoPosY: number): boolean {
        let mino = minos[minoDir][minoType]
        let minoX = (minoPosX - minoOffX) / minoSize
        let minoY = (minoPosY - minoOffY) / minoSize
        for (let y = 0; y < 4; y++) {
            let fy = minoY + y
            for (let x = 0; x < 4; x++) {
                let fx = minoX + x
                let f = getField(field, fx, fy+1)
                if (f != 0 && mino[y * 4 + x] != 0) {
                    return true
                }
            }
        }
        return false
    }

    //% block
    export function writeMino(field: number[], minoType: number, minoDir: number, minoPosX: number, minoPosY: number): number[] {
        let mino = minos[minoDir][minoType]
        let minoX = (minoPosX - minoOffX) / minoSize
        let minoY = (minoPosY - minoOffY) / minoSize
        for (let y = 0; y < 4; y++) {
            let fy = minoY + y
            for (let x = 0; x < 4; x++) {
                let fx = minoX + x
                if ( mino[y*4+x] != 0 )
                    setField(field, fx, fy, 1)
            }
        }
        return mino
    }
    let minoPos = [0,0,0,0]
    //% block
    export function calcBlockPos(mino: number[], minoPosX: number, minoPosY: number, blockIndex: number): number[] {
        let minoX = (minoPosX - minoOffX) / minoSize
        let minoY = (minoPosY - minoOffY) / minoSize
        let bx = (blockIndex % 4)
        let by = Math.floor(blockIndex / 4)
        minoPos[0] = minoPosX + bx * minoSize;
        minoPos[1] = minoPosY + by * minoSize;
        minoPos[2] = minoX + bx
        minoPos[3] = minoY + by;
        return minoPos
    }


}
