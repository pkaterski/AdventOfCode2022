const fs = require('fs');
const log = console.log;

Array.prototype.transpose = function () { return this[0].map((_, index) => this.map(row => row[index])) }

const handleFile = (err, input) => {
  const [towers, instructions] = input.split('\n\n').map(i => i.split('\n').filter(j => j !== ''))
  const towerVals = towers
    .map(i => [...i].filter((_el, index) => index % 4 === 1))
    .transpose()
    .map(i => i.slice(0,-1).filter(i => i !== ' '))
  const resultingTower = instructions
    .map(i => i.split(' ').filter((_, index) => index % 2).map(j => +j)) // towerVals [numberToTake, fromTowerNum, toTowerNum]
    .reduce((acc, [num, from, to]) => {
      const toBeTaken = acc[from - 1].slice(0, num)
      const fromTaken = [...acc.slice(0, from - 1), acc[from - 1].slice(num), ...acc.slice(from)]
      const toTaken   = [...fromTaken.slice(0, to - 1), [...toBeTaken, ...fromTaken[to - 1]], ...fromTaken.slice(to)]
      return toTaken
    }, towerVals)
  const topOnTower = resultingTower.map(i => i.slice(0, 1)).join('')
  log(topOnTower)
}

fs.readFile('./input.txt', 'utf8', handleFile)

