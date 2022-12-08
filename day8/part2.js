const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const grid = input.split('\n').slice(0, -1).map(i => [...i])


  const scenicGrid = []
  for (let i = 0; i < grid.length; i++) {
    const arr = []
    for (let j = 0; j < grid[i].length; j++) {
      if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[i].length - 1)
        arr.push(0)
      else
        arr.push(null)
    }
    scenicGrid.push(arr)
  }
  
  const findScenic = (grid, i1, j1, dir) => {
    let scenic = 1
    if (dir === 'UP') {
      for (let i = i1 - 1; i >= 0; i--) {
        if (grid[i1][j1] > grid[i][j1]) {
          if (i !== 0)
            scenic++
        } else {
          break
        }
      }
    } else if (dir === 'DOWN') {
      for (let i = i1 + 1; i < grid.length; i++) {
        if (grid[i1][j1] > grid[i][j1]) {
          if (i !== grid.length - 1)
            scenic++
        } else {
          break
        }
      }
    } else if (dir === 'LEFT') {
      for (let j = j1 - 1; j >= 0; j--) {
        if (grid[i1][j1] > grid[i1][j]) {
          if (j !== 0)
            scenic++
        } else {
          break
        }
      }
    } else if (dir === 'RIGHT') {
      for (let j = j1 + 1; j <= grid[i1].length; j++) {
        if (grid[i1][j1] > grid[i1][j]) {
          if (j !== grid[i1].length - 1)
            scenic++
        } else {
          break
        }
      }
    }
    return scenic
  }

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      const scenic = findScenic(grid, i, j, 'UP') *
                     findScenic(grid, i, j, 'DOWN') *
                     findScenic(grid, i, j, 'LEFT') *
                     findScenic(grid, i, j, 'RIGHT')
      scenicGrid[i][j] = scenic
    }
  }

  const scenicMax = Math.max(...scenicGrid.flat())

  log(scenicMax)
}

fs.readFile('./input.txt', 'utf8', handleFile)

