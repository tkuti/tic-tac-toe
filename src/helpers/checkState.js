export const isWinningLine = line => {
  let counter = 0
  for (let cell of line) {
    if (cell === 'X') {
      if (counter >= 0) {
        counter++
      } else {
        counter = 0
      }
    } else if (cell === 'O') {
      if (counter <= 0) {
        counter--
      } else {
        counter = 0
      }
    } else {
      counter = 0
    }
    const hasWinner =
      counter === 3
        ? { winner: 'xPlayer' }
        : counter === -3
        ? { winner: 'oPlayer' }
        : false
    if (hasWinner) return hasWinner
  }
  return false
}
