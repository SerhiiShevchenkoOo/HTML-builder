#!/usr/bin/node
import { createReadStream } from 'fs'
import { resolve, dirname } from 'path'
import { stdout } from 'process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const file = resolve(__dirname, 'text.txt')
const readStream = createReadStream(file, 'utf8')

readStream.pipe(stdout)
