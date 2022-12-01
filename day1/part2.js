const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const totalCals = input.split('\n\n').map(i => i.split('\n').map(i => +i).reduce((acc, val) => acc + val))
  const top3CalsTotal = totalCals
    .reduce((acc, val) => [...acc, val].sort((a, b)=>(a - b)).slice(-3), [])
    .reduce((acc, val) => acc + val)
  log(top3CalsTotal)
}

fs.readFile('./input.txt', 'utf8', handleFile)

