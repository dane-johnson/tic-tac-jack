const ms = require('mulberry-server')
const _ = require('lodash')

var board = _.range(9).map(function () {
  return ''
})

function place (shape, pos) {
  board[pos] = shape
  ms.updateAll({board: board})
}

const actions = {
  'play': function(player, pos) {
    console.log('%s pressed %d', player.state.shape, pos)
    place(player.state.shape, pos)
  },
  'init': function(player) {
    player.state.shape = (ms.players.indexOf(player) == 0) ? 'X' : 'O'
    console.log('%s has connected!', player.state.shape)
    player.update({shape: player.state.shape})
  }
}

const server = ms.serve(actions)
