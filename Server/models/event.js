const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Review = require('./review');

const EventSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    location : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
});

EventSchema.post('findOneAndDelete', async function(doc){
    if (doc) {
        await Review.remove({
            _id : {
                $in : doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Event', EventSchema);
