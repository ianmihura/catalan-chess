let whiteSquareGrey = '#a9a9a9'
let blackSquareGrey = '#696969'

function UpdateStatusText(status, fen, pgn) {
    let $status = $('#status')
    let $fen = $('#fen')
    let $fenvalue = $('#fenvalue')
    let $pgn = $('#pgn')
    $status.html(status)
    $fen.html(fen)
    $fenvalue.html(EvaluateFEN(fen))
    $pgn.html(pgn)
}

function RemoveGreySquares() {
    $('#board .square-55d63').css('background', '')
}

function GreySquare(square) {
    let $square = $('#board .square-' + square)

    let background = whiteSquareGrey
    if ($square.hasClass('black-3c85d'))
        background = blackSquareGrey

    $square.css('background', background)
}