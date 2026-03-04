const multer = require("multer")
const fs = require("fs")
const path = require("path")

const audioStorege = multer.diskStorage({
  destination: (req, file, cb) => {
    const existsFile = "uploads/audio"
    if (!fs.existsSync(existsFile)) {
      fs.mkdirSync(existsFile, { recursive: true })
    }
    cb(null, existsFile)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `audio-${Date.now()}${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${uniqueSuffix}${ext}`)
  }
}) 

const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|ogg|mpeg|aac|flac|wav|aiff|alac|opus|wma|dsd/
  const extType = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeOk = file.mimetype.startsWith("audio/")

  if (extType && mimeOk) cb(null, true)
  else cb(new Error("Not allowed file type"), false)
}

const upload = multer({
  storage: audioStorege,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter
})

module.exports = upload