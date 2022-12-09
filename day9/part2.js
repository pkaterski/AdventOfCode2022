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
  const [xT1, yT1] = followHead([[xH1, yH1], [xT, yT]])
  return [[xH1, yH1], [xT1, yT1]]
}

const followHead = ([[xH1, yH1], [xT, yT]]) => {
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
  return [xT1, yT1]
}

const handleFile = (err, input) => {
  const initialCoors = []
  for (let i = 0; i < 10; i++)
    initialCoors.push([0, 0])

  const [_newCoords, tailMoves] = input
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
      ([coors, tailMoves], [p, n]) => {
        const newCoords = []
        for (let i = 1; i < coors.length; i++) {
          if (newCoords.length < 2) {
            const [[xH, yH], [xT, yT]] = performMove([coors[0], coors[1]], [p, n])
            newCoords.push([xH, yH])
            newCoords.push([xT, yT])
          } else {
            const lastRope = newCoords.slice(-1)[0]
            const [xT, yT] = followHead([lastRope, coors[i]])
            newCoords.push([xT, yT])
          }
        }
        const lastTail = newCoords.slice(-1)[0]
        return [newCoords, [...tailMoves, lastTail]]
      },
      [initialCoors, []] // initialCoors, tailHasBeenCoords
    )
  const tailMovesStr = tailMoves.map(([x, y]) => `${x},${y}`)
  log(new Set(tailMovesStr).size)
}

fs.readFile('./input.txt', 'utf8', handleFile)

