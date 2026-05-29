// tools/verifyGallery.js
const fs = require('fs')
const path = require('path')

const galleryPath = path.join(__dirname, '..', 'public', 'images', 'gallery.json')
const exhibitionsDir = path.join(__dirname, '..', 'public', 'images', 'exhibitions')

function loadJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')) } 
  catch (e) { console.error('gallery.json load error:', e); process.exit(1) }
}

const json = loadJson(galleryPath)
const listed = (json.exhibitions || []).map(i => path.basename(i.file))
const actual = fs.existsSync(exhibitionsDir) ? fs.readdirSync(exhibitionsDir) : []

const missing = listed.filter(f => !actual.includes(f))
const extra = actual.filter(f => !listed.includes(f))

console.log('manifest-listed (exhibitions):', listed)
console.log('actual files in folder:', actual)
console.log('---')
console.log('missing (in manifest but NOT in folder):', missing)
console.log('extra (in folder but NOT in manifest):', extra)
