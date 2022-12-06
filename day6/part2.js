const fs = require('fs');
const log = console.log;

const findMarker = (chars, len) => {
  for (let i = len; i < chars.length; i++) {
    const toCheck = chars.slice(i - len, i)
    if (new Set(toCheck).size === len)
      return i
  }
}

const handleFile = (err, input) => {
  const marker = findMarker([...input], 14)
  log(marker)
}

fs.readFile('./input.txt', 'utf8', handleFile)

