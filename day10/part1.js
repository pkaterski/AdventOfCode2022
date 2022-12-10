const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const [data, _nextVal] = input
    .split('\n')
    .slice(0, -1)
    .reduce(([acc, nextVal], val) => {
      const [cycle, _x] = acc.slice(-1)[0]
      if (val === 'noop') {
        return [[...acc, [cycle + 1, nextVal]], nextVal]
      } else { // addx
        const [_, addXStr] = val.split(' ')
        const addX = +addXStr
        return [[...acc, [cycle + 1, nextVal], [cycle + 2, nextVal]], nextVal + addX]
      }
    },
    [[[0, 1]], 1] // [[cycle, X], nextVal]
  )

  const signalStrengths = []
  for (let i = 0; i < 6; i++) {
    const [cycle, val] = data[20 + 40 * i]
    signalStrengths.push(cycle * val)
  }
  const sumSignalStrenghths = signalStrengths.reduce((acc, val) => acc + val)
  log(sumSignalStrenghths)
}

fs.readFile('./input.txt', 'utf8', handleFile)

