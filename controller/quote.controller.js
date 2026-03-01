const Quote = require("../schema/quote.schema");

const addQuote = async (req, res, next) => {
  try {
    const { bookId, text } = req.body;

    // token middleware req.user qilib qo‘ygan bo‘lsa:
    const userId = req["user"].id;

    const quote = await Quote.create({ bookId, userId, text });

    res.status(201).json({ message: "Quote added", quote });
  } catch (err) {
    next(err);
  }
};

const getBookQuotes = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const quotes = await Quote.find({ bookId })
      .populate("bookId", "title")
      .populate("userId", "username email");

    res.status(200).json({ quotes });
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  addQuote,
  getBookQuotes
 };