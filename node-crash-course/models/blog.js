const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//adds the blog stuff in real time via 'timestamps'
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;