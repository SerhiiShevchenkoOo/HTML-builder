import { readdir, mkdir, readFile } from 'fs/promises'
import { dirname, extname, join, basename } from 'path'
import { fileURLToPath } from 'url'
import { createWriteStream } from 'fs'
import { generateCSS } from '../05-merge-styles/index.js'
import { copyFiles } from '../04-copy-directory/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distFolder = `${__dirname}/project-dist`

const generateHTML = async (mainTemplate, componentsFolder, buildFolder) => {
  const files = await readdir(componentsFolder, { withFileTypes: true })
  const writeStream = createWriteStream(`${buildFolder}/index.html`)
  const templatesArray = await Promise.all(
    files
      .filter((dirent) => extname(dirent.name) === '.html')
      .map(async (dirent) => {
        const content = await readFile(
          join(componentsFolder, dirent.name),
          'utf8'
        )
        return { content, name: basename(dirent.name, extname(dirent.name)) }
      })
  )

  const mainTemplateData = (await readFile(mainTemplate, 'utf8')).replace(
    /{{(?<component>[a-z]+)}}/g,
    (_, component) => {
      const template = templatesArray.find(
        (content) => content.name === component
      )
      return template?.content || ''
    }
  )
  writeStream.write(mainTemplateData)
  writeStream.close()
}

const generateStaticPage = async () => {
  await mkdir(distFolder, { recursive: true })

  try {
    await copyFiles(`${__dirname}/assets`, `${distFolder}/assets`)
    await generateCSS(`${__dirname}/styles`, distFolder, 'style.css')
    await generateHTML(
      `${__dirname}/template.html`,
      `${__dirname}/components`,
      distFolder
    )
  } catch (err) {
    console.log(err)
  }
}

// top-level function
generateStaticPage()
