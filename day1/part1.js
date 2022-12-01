const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const totalCals = input.split('\n\n').map(i => i.split('\n').map(i => +i).reduce((acc, val) => acc + val))
  const maxCal = Math.max(...totalCals)
  log(maxCal)
}

fs.readFile('./input.txt', 'utf8', handleFile)

