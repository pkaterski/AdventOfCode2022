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

  const image = data
    .slice(1)
    .reduce((imgRows, [cycle, x]) => {
      const checkCRTSpriteMath = (crtPos, spritePos) => {
        const diff = crtPos - spritePos
        const result = diff < 3 && diff >= 0 ? true : false
        return result
      }
      const getPixel = (crt, x) => checkCRTSpriteMath(crt, x) ? '#' : '.'
      if (cycle % 40 === 1) {
        imgRow = ''
        imgRow += getPixel(1, x)
        return [...imgRows, imgRow]
      } else {
        imgRow = imgRows.slice(-1)[0]
        let crt = cycle % 40
        crt = crt === 0 ? 40 : crt
        imgRow += getPixel(crt, x)
        return [...imgRows.slice(0, -1), imgRow]
      }
    }, []) // [imgRows]

  log(image.join('\n'))
}

fs.readFile('./input.txt', 'utf8', handleFile)

