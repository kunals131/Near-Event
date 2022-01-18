const mongoose = require('mongoose');
const express = require('express');
const app = express();

const main = ()=>{
    mongoose.connect('mongodb://localhost:27017/near-event')
    .then(() => {
        console.log('DATABASE CONNECTION IS OPEN!')
    })
    .catch(err => {
        console.log('Oh No Mongo Connection ERRORRRR!!!!')
        console.log(err);
    })

}

module.exports = main;