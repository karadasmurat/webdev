const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
});

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    trackNo: {
        type: Number,
        required: true
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }]
});

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    recordLabel: {
        type: String,
        required: true
    },
    tracks: [trackSchema],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }]
});

const Artist = mongoose.model('Artist', artistSchema);
const Album = mongoose.model('Album', albumSchema);
const Track = mongoose.model('Track', trackSchema);
const Genre = mongoose.model('Genre', genreSchema);

module.exports = {
    Artist,
    Album,
    Track,
    Genre
};