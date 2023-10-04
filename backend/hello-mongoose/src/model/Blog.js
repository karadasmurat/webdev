const {
    Schema,
    model
} = require('mongoose');

// With Mongoose, everything is derived from a Schema. 
const blogSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    slug: String,
    published: Boolean,
    author: String,
    content: {
        type: String,
        required: true
    },

    createdAt: Date,
    updated: {
        type: Date,
        default: Date.now
    },
    class: {
        type: Number,
            min: 1,
            max: 10
    },
    // arrays of SchemaTypes (primitive arrays):
    tags: [String],
    // arrays of subdocuments (document arrays):
    comments: [{
        user: String,
        content: String,
        votes: Number
    }]
});


// Creating a model
// To use our schema definition, we need to convert our blogSchema into a Model we can work with.
// To do so, we pass it into mongoose.model(modelName, schema):
const Blog = model('Blog', blogSchema);

// export the Blog model from Mongoose schema using CommonJS syntax
module.exports = {
    Blog
}