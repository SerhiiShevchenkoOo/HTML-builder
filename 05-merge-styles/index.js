import { readdir, readFile, mkdir, access } from 'fs/promises'
import { createWriteStream } from 'fs'
import { dirname, extname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const generateCSS = async (root, buildFolder, file) => {
  const isNotExist = buildFolder
    ? await access(buildFolder).catch(() => true)
    : false

  if (isNotExist) await mkdir(buildFolder, { recursive: true })

  const writeStream = createWriteStream(`${buildFolder}/${file}`)
  const files = await readdir(root, { withFileTypes: true })

  await Promise.all(
    files
      .filter((dirent) => extname(dirent.name) === '.css')
      .map(async (dirent) => {
        const content = await readFile(join(root, dirent.name), 'utf8')
        writeStream.write(content.replace(/\n|" "/g, ''))
      })
  )
  writeStream.close()
}

generateCSS(`${__dirname}/styles`, `${__dirname}/test-files/`, 'bundle.css')
