const fs = require('fs');
const log = console.log;

const moveToCoor = ([x, y], [p, n]) => {
  if (p === 'U') {
    return [x, y + n]
  }
  if (p === 'D') {
    return [x, y - n]
  }
  if (p === 'L') {
    return [x - n, y]
  }
  if (p === 'R') {
    return [x + n, y]
  }
}

const performMove = ([[xH, yH], [xT, yT]], [p, n]) => {
  const [xH1, yH1] = moveToCoor([xH, yH], [p, n])
  let [xT1, yT1] = [0, 0]
  if (Math.abs(xH1 - xT) <= 1 && Math.abs(yH1 - yT) <= 1) { // touching
    [xT1, yT1] = [xT, yT]
  } else if (xH1 === xT && yH1 !== yT) {                    // same column
    [xT1, yT1] = [xT, yT > yH1 ? yT - 1 : yT + 1]
  } else if (yH1 === yT && xH1 !== xT) {                    // same row
    [xT1, yT1] = [xT > xH1 ? xT - 1 : xT + 1, yT]
  } else {
    [xT1, yT1] = [xT > xH1 ? xT - 1 : xT + 1, yT > yH1 ? yT - 1 : yT + 1]
  }
  return [[xH1, yH1], [xT1, yT1]]
}

const handleFile = (err, input) => {
  const [_headFinal, _tailFinal, tailMoves] = input
    .split('\n')
    .slice(0, -1)
    .map(i => {
      const [p, n] = i.split(' ')
      let moveByOne = []
      for (let i = 0; i < +n; i++) {
        moveByOne.push([p, 1])
      }
      return moveByOne
    })
    .flat()
    .reduce(
      ([[xH, yH], [xT, yT], tailMoves], [p, n]) => {
        const [[xH1, yH1], [xT1, yT1]] = performMove([[xH, yH], [xT, yT]], [p, n])
        return [[xH1, yH1], [xT1, yT1], [...tailMoves, [xT1, yT1]]]
      },
      [[0, 0], [0, 0], []] // headCords, tailCords, tailHasBeenCoords
    )
  const tailMovesStr = tailMoves.map(([x, y]) => `${x},${y}`)
  log(new Set(tailMovesStr).size)
}

fs.readFile('./input.txt', 'utf8', handleFile)

