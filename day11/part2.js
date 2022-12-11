const fs = require('fs');
const log = console.log;

const handleFile = (err, input) => {
  const monkeys = input.split('\n\n').map(i => {
    const lines = i.split('\n').slice(0, 6)
    const monkeyNum = +lines[0].split(' ')[1].split(':')[0]
    const items = lines[1].split(':')[1].replace(/ /g, '').split(',').map(i => +i)
    const operationStrs = lines[2].split('= ')[1].split(' ')
    const operation = (x) => {
      [a, op, b] = operationStrs.map(i => i === 'old' ? x : i)
      if (op === '*')
        return +a * +b
      else if (op === '+')
        return +a + +b
    }
    const divisibleBy = +lines[3].split('divisible by ')[1]
    const ifTrueMonkey = +lines[4].split('throw to monkey ')[1]
    const ifFalseMonkey = +lines[5].split('throw to monkey ')[1]

    return { monkeyNum, items, operation, divisibleBy, ifTrueMonkey, ifFalseMonkey, inspectedItems: 0 }
  })

  const divisibilities = monkeys.map(i => i.divisibleBy)
  for (let monkey of monkeys) {
    let transformedItems = []
    for (let item of monkey.items) {
      const transformedItem = {}
      for (let num of divisibilities) {
        transformedItem[num] = item % num
      }
      transformedItems.push(transformedItem)
    }
    monkey.items = transformedItems
  }

  for (let i = 0; i < 10000; i++) {
    for (let monkey of monkeys) {
      for (let item of monkey.items) {
        monkey.inspectedItems++
        for (let num of divisibilities) {
          item[num] = monkey.operation(item[num]) % num
        }
        if (item[monkey.divisibleBy] === 0) {
          monkeys[monkey.ifTrueMonkey].items.push(item)
        } else {
          monkeys[monkey.ifFalseMonkey].items.push(item)
        }
      }
      monkey.items = []
    }
  }
  const [inspected1, inspected2] = monkeys.map(i => i.inspectedItems).sort((a,b)=>b-a).slice(0, 2)
  log(inspected1 * inspected2)
}

fs.readFile('./input.txt', 'utf8', handleFile)

