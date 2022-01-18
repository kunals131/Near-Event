
const mongoose = require('mongoose');
const Event = require('../models/event')
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
//Setting up Moongose;

mongoose.connect('mongodb://localhost:27017/near-event')
.then(()=>{
    console.log('DATABASE CONNECTION IS OPEN!')
})
.catch(err=>{
    console.log('Oh No Mongo Connection ERRORRRR!!!!')
    console.log(err);
})

const sample = (array)=>array[Math.floor(Math.random()*array.length)];

const seedDb = async()=>{
    //deletes everything
    await Event.deleteMany({});
    for(let i = 0; i<50; ++i) {
        const random1000 = Math.floor(Math.random()*1000)
        const eventToAdd = new Event({
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`
        })
        await eventToAdd.save();
    }
    console.log('Done!')

}

seedDb();