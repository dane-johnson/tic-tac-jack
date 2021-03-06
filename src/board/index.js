const $ = require('jquery')
const _ = require('lodash')
const conn = require('mulberry-client').connect()

$('.turn').text("It's X's turn!")

function drawBoard() {
  gamestate = conn.gamestate()
  var $board = $('.board')
  $board.empty()
  board = gamestate.board || _.range(9).map(function(){return ''})
  board = board.map(function(shape, pos) {
    return (shape == '') ? String(pos) : shape
  })
  const str = _.chunk(board, 3).map(function(row){
    return "<p>" + row.join('|') + "</p>"
  }).join("<p>-----</p>")
  $board.html(str)
}

function updateTurn (shape) {
  $('.turn').text("It's " + shape + "'s turn!")
}

updateTurn('X')

drawBoard()

function update(gamestate) {
  updateTurn(gamestate.turn)
  drawBoard()
}

function reset() {
  updateTurn('X')
  drawBoard()
}

conn.onUpdate(update)
conn.onReset(reset)
