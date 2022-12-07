const fs = require('fs');
const log = console.log;

const generatefileTree = (cmds) => {
  let path = [] // current path we're in
  let fileTree = { "/" : { files: [] } } // file fileTree, dirs are keys in obj -> { files: [...nonDirs], dir1: {files}, dir2: {files} }
  let fileTreeRef = fileTree
  for (let cmd of cmds) {
    if (cmd.includes('$ cd')) {
      const cdDir = cmd.split(' ')[2]
      const newPath = cdDir === '..' ? path.slice(0, -1) : [...path, cdDir]
      path = newPath

      fileTreeRef = fileTree
      for (let dir of path)
        fileTreeRef = fileTreeRef[dir]
    }

    else if (cmd !== '$ ls') {
      const [meta, fileName] = cmd.split(' ')
      if (meta === 'dir') {
        fileTreeRef[fileName] = { files: [] }
      } else {
        fileTreeRef.files.push( { size: +meta, name: fileName } )
      }
    }
  }
  return fileTree
}

// mutable
const attachSizesTofileTree = (fileTree) => {
  const sumFiles = fileTree.files.reduce((acc, val) => acc + val.size, 0)
  let sumSubDirs = 0
  for (let dir of Object.keys(fileTree)) {
    if (dir === 'files' || dir === 'size')
      continue
    sumSubDirs += attachSizesTofileTree(fileTree[dir])
  }
  const total = sumFiles + sumSubDirs
  fileTree['size'] = total
  return total
}

const dirsLessThan = (fileTree, size) => {
  let total = 0
  if (fileTree.size <= size)
    total += fileTree.size
  for (let dir of Object.keys(fileTree)) {
    if (dir === 'files' || dir === 'size')
      continue
    total += dirsLessThan(fileTree[dir], size)
  }
  return total
}

const getDirsWithGTSpace = (fileTree, space, dirName) => {
  const dirs = []

  if (fileTree.size >= space)
    dirs.push({size: fileTree.size, name: dirName})

  //log(dirName, fileTree.size)

  for (let dir of Object.keys(fileTree)) {
    if (dir === 'files' || dir === 'size')
      continue

    //if (fileTree[dir].size >= space)
    //  dirs.push({size: fileTree[dir].size, name: dir})

    const subDirs = getDirsWithGTSpace(fileTree[dir], space, dir)
    dirs.push(...subDirs)
  }
  return dirs
}

const logFileStructure = (fileTree, path) => {
  for (const dir of Object.keys(fileTree)) {
    if (dir === 'files' || dir === 'size')
      continue

    const newPath = (path + '/' + dir).replace('//', '/')
    log(newPath, fileTree[dir].size)
  }
  for (const dir of Object.keys(fileTree)) {
    if (dir === 'files' || dir === 'size')
      continue

    const newPath = (path + '/' + dir).replace('//', '/')
    logFileStructure(fileTree[dir], newPath)
  }
}

const handleFile = (err, input) => {
  const cmds = input.split('\n')
  const filefileTree = generatefileTree(cmds)
  const totalSpace = attachSizesTofileTree(filefileTree['/'])
  const neededSpace = 30000000 - 70000000 + totalSpace
  const dirsToDelete = getDirsWithGTSpace(filefileTree['/'], neededSpace, '/')
  log(Math.min(...dirsToDelete.map(i => i.size)))
}

fs.readFile('./input.txt', 'utf8', handleFile)

