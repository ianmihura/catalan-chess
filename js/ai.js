// const VALUE_P = 1
// const VALUE_N = 3
// const VALUE_B = 3
// const VALUE_R = 5
// const VALUE_Q = 9
// const VALUE_K = 100
// const VALUE_p = -1
// const VALUE_n = -3
// const VALUE_b = -3
// const VALUE_r = -5
// const VALUE_q = -9
// const VALUE_k = -100

const VALUES = {
    p: -1,
    n: -3,
    b: -3,
    r: -5,
    q: -9,
    k: -90,
    P: 1,
    N: 3,
    B: 3,
    R: 5,
    Q: 9,
    K: 90
}

function AIMove() {
    window.setTimeout(makeRandomMove, 250);
}

function makeRandomMove() {
    let possibleMoves = game.moves()

    if (possibleMoves.length === 0) return

    let randomIdx = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIdx])
    board.position(game.fen())

    updateStatus()
}

function EvaluateFEN(fen) {
    let value = 0

    let bfen = fen.split(' ')[0].split('/')

    for (let i in bfen) {
        file = bfen[i]

        for (let j in file) {
            p = file[j]
            if (Number(p)) continue
            value += VALUES[p]
        }
    }
    return value
}