const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const grid = input.split('\n').slice(0, -1).map(i => [...i])


  const visabilityGrid = []
  for (let i = 0; i < grid.length; i++) {
    const arr = []
    for (let j = 0; j < grid[i].length; j++) {
      if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[i].length - 1)
        arr.push(0)
      else
        arr.push(null)
    }
    visabilityGrid.push(arr)
  }
  
  const findIsHidden = (grid, i1, j1, dir) => {
    let isHidden = false
    if (dir === 'UP') {
      for (let i = i1 - 1; i >= 0; i--) {
        if (grid[i1][j1] <= grid[i][j1]) {
          isHidden = true
          break
        }
      }
    } else if (dir === 'DOWN') {
      for (let i = i1 + 1; i < grid.length; i++) {
        if (grid[i1][j1] <= grid[i][j1]) {
          isHidden = true
          break
        }
      }
    } else if (dir === 'LEFT') {
      for (let j = j1 - 1; j >= 0; j--) {
        if (grid[i1][j1] <= grid[i1][j]) {
          isHidden = true
          break
        }
      }
    } else if (dir === 'RIGHT') {
      for (let j = j1 + 1; j <= grid[i1].length; j++) {
        if (grid[i1][j1] <= grid[i1][j]) {
          isHidden = true
          break
        }
      }
    }
    return isHidden
  }

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      const hidden = findIsHidden(grid, i, j, 'UP') &&
                     findIsHidden(grid, i, j, 'DOWN') &&
                     findIsHidden(grid, i, j, 'LEFT') &&
                     findIsHidden(grid, i, j, 'RIGHT')
      visabilityGrid[i][j] = hidden ? 1 : 0
    }
  }

  const invisibleCount = visabilityGrid.reduce((acc, val) => acc + val.reduce((a,b) => a + b), 0)
  const gridCount = grid.length * grid.length

  log(gridCount - invisibleCount)
}

fs.readFile('./input.txt', 'utf8', handleFile)

