const fs = require('fs');
const log = console.log;

const findMarker = chars => {
  for (let i = 4; i < chars.length; i++) {
    const toCheck = chars.slice(i - 4, i)
    if (new Set(toCheck).size === 4)
      return i
  }
}

const handleFile = (err, input) => {
  const marker = findMarker([...input])
  log(marker)
}

fs.readFile('./input.txt', 'utf8', handleFile)

