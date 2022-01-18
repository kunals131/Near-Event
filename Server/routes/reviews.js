const express =  require('express');
const router = express.Router({mergeParams : true}); //merge params will give access to this using 
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Event = require('../models/event')
const Review = require('../models/review')
const {reviewSchema} = require('../schemas');


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


router.post('/', validateReview,catchAsync(async(req,res)=>{
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

router.delete('/:reviewId',catchAsync(async (req,res)=>{
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


module.exports = router;