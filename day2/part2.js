const fs = require('fs');
const log = console.log;

const inputToMoves = ([i, j]) => {
  let move1;
  if (i === 'A') move1 = 1; // rock
  if (i === 'B') move1 = 2; // paper
  if (i === 'C') move1 = 3; // scissors

  if (j === 'X') return [move1, (move1 + 1) % 3 + 1]; // loose
  if (j === 'Y') return [move1, move1];               // draw
  if (j === 'Z') return [move1, move1 % 3 + 1];       // win
}

// win   -> 2
// draw  -> 1
// loose -> 0
const player2Win = (move1, move2) => {
  if (move1 === 1 && move2 === 3) return 0;
  if (move1 === 3 && move2 === 1) return 2;
  return move2 - move1 + 1;
}

const player2Score = (move1, move2) => {
  return player2Win(move1, move2) * 3 + move2;
}

//log(
//  ['A Y', 'B X', 'C Z'].map(i => i.split(' ')).map(inputToMoves).map(i => player2Score(...i))
//)


const handleFile = (err, input) => {
  const scores = input.split('\n').filter(i => i !== '').map(i => i.split(' ')).map(inputToMoves).map(i => player2Score(...i))
  const totalScore = scores.reduce((acc, val) => acc + val)
  log(totalScore)
}

fs.readFile('./input.txt', 'utf8', handleFile)

