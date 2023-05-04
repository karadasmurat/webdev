const sec = require('../env');
const seedHelper = require('./seedHelper');
const mongoose = require('mongoose');
const Campground = require('../model/Campground');

const EXPRESS_PORT = 3000;
const MONGO_PORT = '27017';

//const HOST = '127.0.0.1';
const HOST = 'dev-cluster.ct6sszv.mongodb.net';

const DBASE = 'yelp-camp';
// const LOCAL_CONN_STR = `mongodb://${HOST}:${MONGO_PORT}/${DBASE}`;
const ATLAS_CONN_STR = `mongodb+srv://${sec.MONGO_USER}:${sec.MONGO_PASS}@${HOST}/${DBASE}`;
const options = {};

mongoose.connect(ATLAS_CONN_STR, options)
    .then(console.log("Connected to mongodb."))
    .catch(error => console.log("Cannot connect. " + error));






const seedDB = async () => {
    console.log("Deleting existing records.");
    await Campground.deleteMany({});

    const cities = Array.from(seedHelper.getCities(10));
    const titles = Array.from(seedHelper.getTitles(10));
    for (let i = 0; i < 10; i++) {

        const camp = new Campground({
            title: titles[i],
            location: cities[i].city + ", " + cities[i].state,
            image: "https://source.unsplash.com/random/400x400/?camping&" + Math.random(),
            description: "Lorem ipsum dolor sit amet",
            price: parseFloat((Math.random() * 20 + 10).toFixed(2))

        });
        await camp.save();
    }

}

seedDB()
    .then(() => mongoose.connection.close());