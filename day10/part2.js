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
        return [[...acc, [cycle + 1, nextVal], [cycle + 2, nextVal]], nextVal + +addXStr]
      }
    }, [[[0, 1]], 1]) // [[cycle, X], nextVal]

  const image = data
    .slice(1)
    .reduce((imgRows, [cycle, x]) => {
      const checkCRTSpriteMath = (crtPos, spritePos) => {
        const diff = crtPos - spritePos
        return diff < 3 && diff >= 0 ? true : false
      }
      const getPixel = (crt, x) => checkCRTSpriteMath(crt, x) ? '#' : '.'
      if (cycle % 40 === 1) {
        imgRow = getPixel(1, x)
        return [...imgRows, imgRow]
      } else {
        imgRow = imgRows.slice(-1)[0]
        imgRow += getPixel(cycle % 40 === 0 ? 40 : cycle % 40, x)
        return [...imgRows.slice(0, -1), imgRow]
      }
    }, []) // [imgRows]

  log(image.join('\n'))
}

fs.readFile('./input.txt', 'utf8', handleFile)

