const $ = require('jquery')
const _ = require('lodash')
const conn = require('mulberry-client').connect()

$("#room_code").text("HELL")

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

drawBoard()

function update(gamestate) {
  console.log("update")
  console.log(gamestate)
  drawBoard(gamestate.board)
}

conn.register(update)
