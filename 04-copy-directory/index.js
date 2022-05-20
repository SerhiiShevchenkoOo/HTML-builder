import { readdir, copyFile, stat, mkdir } from 'fs/promises'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const copyFiles = async (root, copy) => {
  // create folder if not exists
  await mkdir(`${copy}`, { recursive: true })

  // read files
  const files = await readdir(root, { withFileTypes: true })
  files.forEach(async (file) => {
    const filePath = `${root}/${file.name}`
    const copyPath = `${copy}/${file.name}`

    const fileStats = await stat(filePath).catch((err) => {
      throw new Error(err)
    })

    // if file is directory, copy files recursively
    if (fileStats.isDirectory()) await copyFiles(filePath, copyPath)
    else await copyFile(filePath, copyPath)
  })
}

// task 4
copyFiles(`${__dirname}/files`, `${__dirname}/copy-files`)
