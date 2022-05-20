import * as readline from 'node:readline/promises'
import { promises } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { stdin as input, stdout as output } from 'node:process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rl = readline.createInterface({ input, output })

const saveToFile = async (data) => {
  if (!data.length) return
  if (data === 'exit') rl.close()

  const date = new Date().toISOString()
  await promises.appendFile(`${__dirname}/hello.txt`, `${date}: ${data} \n`)
}

rl.on('close', () => output.write('Bye!\n'))
rl.on('line', (data) => saveToFile(data))
rl.question('What is your name?\n').then((text) => saveToFile(text)) // after first press enter, the line event will be triggered
