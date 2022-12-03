const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const lines = input
    .split('\n')
    .slice(0, -1)

  const partition3 = lines
    .reduce((acc, val, index) => index % 3 ? [...acc.slice(0 ,-1), [...acc.slice(-1,)[0], val]] : [...acc, [val]], [])

  const result = partition3
    .map(([a, b, c]) => {
      const common = [...a].filter(el => [...b].includes(el) && [...c].includes(el))
      const val = [...new Set(common)][0]
      const num = val.charCodeAt(0) - 96
      return num > 0 ? num : num + 31 + 27
    })
    .reduce((acc, val) => acc + val)
  log(result)
}

fs.readFile('./input.txt', 'utf8', handleFile)

