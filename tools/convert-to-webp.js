// tools/convert-to-webp.js
const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

const imagesRoot = path.join(__dirname, '..', 'public', 'images')
const targetDirs = ['exhibitions', 'sports', 'journey'] // 필요시 조정
const quality = 80
const updateManifest = true // true면 gallery.json의 확장자를 .webp로 바꿉니다 (기본값)

async function run() {
  for (const dir of targetDirs) {
    const folder = path.join(imagesRoot, dir)
    if (!await fs.pathExists(folder)) continue
    const files = await fs.readdir(folder)
    for (const f of files) {
      const ext = path.extname(f).toLowerCase()
      if (!['.jpg','.jpeg','.png',''].includes(ext)) continue
      const input = path.join(folder, f)
      const outName = path.basename(f, ext) + '.webp'
      const output = path.join(folder, outName)
      if (await fs.pathExists(output)) {
        console.log('skip (exists):', output)
        continue
      }
      console.log('convert:', input, '->', output)
      await sharp(input).webp({ quality }).toFile(output)
    }
  }

  if (updateManifest) {
    const galleryPath = path.join(imagesRoot, 'gallery.json')
    if (await fs.pathExists(galleryPath)) {
      const json = await fs.readJson(galleryPath)
      for (const k of Object.keys(json)) {
        json[k] = json[k].map(entry => {
          const ext = path.extname(entry.file)
          if (!ext) return entry
          return { ...entry, file: entry.file.replace(ext, '.webp') }
        })
      }
      await fs.writeJson(galleryPath, json, { spaces: 2 })
      console.log('gallery.json updated to .webp extensions')
    }
  }
}

run().catch(err => { console.error(err); process.exit(1) })
