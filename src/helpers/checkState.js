export const isWinningLine = (line, size) => {
  let counter = 0
  for (let cell of line) {
    if (cell === 'X') {
      if (counter >= 0) {
        counter++
      } else {
        counter = 1
      }
    } else if (cell === 'O') {
      if (counter <= 0) {
        counter--
      } else {
        counter = -1
      }
    } else {
      counter = 0
    }
    const hasWinner =
      counter === size
        ? { winner: 'xPlayer' }
        : counter === (0 - size)
        ? { winner: 'oPlayer' }
        : false
    if (hasWinner) return hasWinner
  }
  return false
}
