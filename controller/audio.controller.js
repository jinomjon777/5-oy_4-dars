const CustomErrorhandler = require("../error/custom-error.handler")
const fs=require("fs")
const path=require("path")
const BookSchema = require("../schema/book.schema")

const stream = async (req, res) => {
  try {
    const { bookId } = req.params

    const foundedBook = await BookSchema.findById(bookId)

    if (!foundedBook) {
      throw CustomErrorhandler.NotFound("Book not found")
    }

    if (!foundedBook.audioUrl) {
      throw CustomErrorhandler.NotFound("Url not found")
    }

    const fileUrl = path.join(__dirname, "..", foundedBook.audioUrl)

    if (!fs.existsSync(fileUrl)) {
      throw CustomErrorhandler.NotFound("Audio file not found on disk")
    }

    const stat = fs.statSync(fileUrl)

    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.slice(6).split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const result = (end - start) + 1

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": result,
        "Content-Type": "audio/mpeg"
      })

      return fs.createReadStream(fileUrl, { start, end }).pipe(res)
    }

    res.writeHead(200, {
      "Accept-Ranges": "bytes",
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg"
    })

    return fs.createReadStream(fileUrl).pipe(res)

  } catch (error) {
    if (res.headersSent) return
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = stream