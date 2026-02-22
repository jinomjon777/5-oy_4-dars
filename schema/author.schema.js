const { Schema, default: mongoose } = require("mongoose");

const Author= new Schema({
  fullName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  deathDate: {
    type: Date,
    required: true
  },
  bio: {
    type: String,
    required: true    
  },
  work: {
    type: String,
    required: true    
  },
  period: {
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

const AuthorSchema = mongoose.model("author", Author);

module.exports=AuthorSchema