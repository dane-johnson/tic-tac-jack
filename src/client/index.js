const $ = require('jquery')
const _ = require('lodash')
const conn = require('mulberry-client').connect()

$('button').on('click', function() {
  conn.emit('reset')
})

function drawBoard () {
  gamestate = conn.gamestate()
  var board = $('.board')
  board.empty()
  _.range(9).map(function(i) {
    var button
    if (!gamestate.board || gamestate.board[i] == '') {
      button = $('<button>' + i + '</button>')
        .on('click', function() {
          conn.emit('play', i)
        })
    } else {
      button = $('<button>' + gamestate.board[i] + '</button>')
      button.attr('disabled', '')
    }
    board.append(button)
    if ((i + 1) % 3 === 0){
      board.append("<br/>")
    }
  })
}

drawBoard()

conn.onUpdate(function(data) {
  if(_.has(data, 'shape')) {
    $('.shape').text("Your shape is " + data.shape)
  }
  if(_.has(data, 'board')) {
    drawBoard()
  }
})

conn.onReset(function() {
  drawBoard()
})
