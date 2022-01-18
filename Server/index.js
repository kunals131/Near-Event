const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const ExpressError = require('./utils/ExpressError')
const events = require('./routes/events');
const reviews = require('./routes/reviews');
const main = require('./DatabaseConfig/config');


//MiddleWares : 
app.use(morgan('tiny'));
app.use(cors());

//middlewares to parse the body;
app.use(express.urlencoded({ extended: true }));

//Setting up Moongose;
main();

//test Route
app.get('/', (req, res) => {
    res.send('SERVER RUNNING : NEAR_EVENT');
})

//Main App Routes
app.use('/events', events);
app.use('/campgrounds/:id/reviews', reviews)

//404 Route
app.all('*', (req,res,next)=>{
    throw new ExpressError('Page Not Found!', 404);

})

//Error handler : 
app.use((err,req,res,next)=>{
    const {statusCode = 500, message = "Something went Wrong"} = err;
    res.status(statusCode).json({
        message : message,
    })
})

app.listen(3001, () => {
    console.log('SERVER UP AND RUNNING ON 3001')
})

//Reques ---ERROR-->> Response