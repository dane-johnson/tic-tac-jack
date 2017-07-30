const ms = require('mulberry-server')
const _ = require('lodash')

var board = _.range(9).map(function () {
  return ''
})

var turn = 'X'

function place (shape, pos) {
  board[pos] = shape
  turn = (turn === 'X') ? 'O' : 'X'
  ms.updateAll({board: board, turn: turn})
}

const actions = {
  'play': function(player, pos) {
    console.log('%s pressed %d', player.state.shape, pos)
    if (player.state.shape === turn) {
      place(player.state.shape, pos)
    }
  },
  'init': function(player) {
    player.state.shape = (ms.players.indexOf(player) == 0) ? 'X' : 'O'
    console.log('%s has connected!', player.state.shape)
    player.update({shape: player.state.shape})
  }
}

const server = ms.serve(actions)
