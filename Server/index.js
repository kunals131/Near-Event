const express = require('express');
const Joi = require('Joi');
const mongoose = require('mongoose');
const Event = require('./models/event')
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const ExpressError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync');
const Review =require('./models/review')
const campgrounds = require('./routes/campgrounds');
//Morgan Middleware 
app.use(morgan('tiny'));
app.use(cors());
//Our Own MiddleWare
app.use((req,res, next)=>{
    console.log('MY FIRST MIDDLEWARE' + req.ver);
    next();
});
const {eventSchema, reviewSchema} = require('./schemas');

const validateEvent = (req,res,next)=>{

    const{error} = eventSchema.validate(req.body);
     if (error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if (error){
       const msg = error.details.map(el=>el.message).join(',');
       throw new ExpressError(msg, 400);
   }
   else {
       next();
   }
}

 
//middlewares to parse the body;
app.use(express.urlencoded({ extended: true }));

//Setting up Moongose;

mongoose.connect('mongodb://localhost:27017/near-event')
    .then(() => {
        console.log('DATABASE CONNECTION IS OPEN!')
    })
    .catch(err => {
        console.log('Oh No Mongo Connection ERRORRRR!!!!')
        console.log(err);
    })


//test Route
app.get('/', (req, res) => {
    res.send('SERVER RUNNING : NEAR_EVENT');
})

app.use('/events', campgrounds);

app.post('/events/:id/reviews', validateReview,catchAsync(async(req,res)=>{
    try {
    const event = await Event.findById(req.params.id);
    const {body, rating} = req.body
    const review = new Review({body,rating});
    event.reviews.push(review);
    await review.save();
    await event.save();
    res.json({...review, msg : 'Successfully done!'})
    }catch(err) {
        res.status(404).json(err);
    }

}));

app.delete('/events/:id/reviews/:reviewId',catchAsync(async (req,res)=>{
    try {
    const {id,reviewId} = req.params;
    await Event.findByIdAndUpdate(id, {
        $pull : {reviews : reviewId}
    });
    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({msg : "Successfully deleted!"})
}catch(err) {
    res.status(404).json(err);
}
}))



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