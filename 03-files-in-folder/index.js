import { readdir, stat } from 'fs/promises'
import { dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { stdout } from 'process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ONE_KB = 1024

const getFiles = async (dir) => {
  const files = (await readdir(dir, { withFileTypes: true })).filter((dirent) =>
    dirent.isFile()
  )

  files.forEach(async (file) => {
    const filePath = `${dir}/${file.name}`
    const fileStats = await stat(filePath).catch((err) => {
      throw new Error(err)
    })

    const basePath = basename(filePath, extname(filePath))
    const kilobytes = (Math.log(fileStats.size) / Math.log(ONE_KB)).toFixed(2)

    stdout.write(`${basePath} - ${kilobytes}kb - ${extname(filePath)}\n`)
  })
}

getFiles(`${__dirname}/secret-folder`)
