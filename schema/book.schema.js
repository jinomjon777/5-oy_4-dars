const { Schema, default: mongoose } = require("mongoose");

const Book= new Schema({
  title: {
    type: String,
    required: true
  },
  peges: {
    type: Number,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  publishedHome: {
    type: String,
    required: true    
  },
  description: {
    type: String,
    required: true    
  },
  genre: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
},{
  versionKey: false,
  timestamps: true
})

const BookSchema = mongoose.model("book", Book);

module.exports=BookSchema