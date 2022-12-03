const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const lines = input
    .split('\n')
    .slice(0, -1)
  const arr0s = lines.filter((_el, index) => index % 3 === 0)
  const arr1s = lines.filter((_el, index) => index % 3 === 1)
  const arr2s = lines.filter((_el, index) => index % 3 === 2)

  const combined = arr0s.map((_el, index) => [arr0s[index], arr1s[index], arr2s[index]])

  const result = combined
    .map(([a, b, c]) => {
      const common = [...a].filter(el => [...b].includes(el) && [...c].includes(el))
      const val = [...new Set(common)][0]
      const num = val.charCodeAt(0) - 96
      const normalizedNum = num > 0 ? num : num + 31 + 27
      return normalizedNum
    })
    .reduce((acc, val) => acc + val)
  console.log(result)
}

fs.readFile('./input.txt', 'utf8', handleFile)

