const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const result = input
    .split('\n')
    .slice(0, -1)
    .map(i => {
      const [a, b] = [i.slice(0, i.length / 2), i.slice(i.length / 2, )]
      const common = [...a].filter(el => [...b].includes(el))
      const val = [...new Set(common)][0]
      const num = val.charCodeAt(0) - 96
      const normalizedNum = num > 0 ? num : num + 31 + 27
      return normalizedNum
    })
    .reduce((acc, val) => acc + val)
  console.log(result)
}

fs.readFile('./input.txt', 'utf8', handleFile)

