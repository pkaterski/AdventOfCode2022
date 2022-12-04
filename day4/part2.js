const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const result = input
    .split('\n')
    .slice(0, -1)
    .map(i => i.split(',').map(j => j.split('-').map(k => +k)))
    .reduce((acc, [[a1,b1],[a2,b2]]) => b1 < a2 || a1 > b2 ? acc : acc + 1, 0)
  
  log(result)
}

fs.readFile('./input.txt', 'utf8', handleFile)

