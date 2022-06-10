// Using https://github.com/jhlywa/chess.js
// Usign https://github.com/oakmac/chessboardjs/

let board = null
let game = new Chess()

function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onDrop(source, target) {
    let move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    if (move === null) return 'snapback'

    AIMove()
    updateStatus()
    RemoveGreySquares()
}

function onSnapEnd() {
    board.position(game.fen())
}

function onMouseoverSquare(square, piece) {
    let moves = game.moves({
        square: square,
        verbose: true
    })

    if (moves.length === 0) return

    GreySquare(square)

    for (let i = 0; i < moves.length; i++)
        GreySquare(moves[i].to)
}

function updateStatus() {
    let moveColor = game.turn() === 'b' ? 'Black' : 'White'
    let status = `${moveColor} to move`

    if (game.in_checkmate())
        status = `Game over, ${moveColor} is in checkmate.`

    else if (game.in_draw())
        status = 'Game over, drawn position'

    else if (game.in_check())
        status += `, ${moveColor} is in check`

    UpdateStatusText(status, game.fen(), game.pgn())
}

let config = {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    onMouseoutSquare: RemoveGreySquares,
    onMouseoverSquare: onMouseoverSquare,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}

board = Chessboard('board', config)

$('#startBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)

updateStatus()