const { Router } = require("express");
const { addQuote, getBookQuotes } = require("../controller/quote.controller");
const auth = require("../middleware/authorization");

const quoteRouter = Router();

quoteRouter.post("/quotes", auth, addQuote);
quoteRouter.get("/books/:bookId/quotes", getBookQuotes);

module.exports = quoteRouter;