const {
    Schema,
    model
} = require('mongoose');

// With Mongoose, everything is derived from a Schema. 
const blogSchema = new Schema({
    title: String,
    slug: String,
    published: Boolean,
    author: String,
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    comments: [{
        user: String,
        content: String,
        votes: Number
    }]
});

// The next step is compiling our schema into a Model.
const Blog = model('Blog', blogSchema);

// export the Blog model from Mongoose schema using CommonJS syntax
module.exports = {
    Blog
}