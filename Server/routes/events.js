const express =  require('express');
const router = express.Router();



router.get('/', catchAsync(async (req, res, next) => {
    try {
        const AllEvents = await Event.find({});
        res.json(AllEvents);
    } catch (err) {
       next(err);
    }
}));

//New Events
router.post('/', validateEvent, catchAsync(async (req, res) => {
    const { title, location, price, description } = req.body;
 
        const newEvent = new Event({ title, location, price, description });
        await newEvent.save();
        res.json({
            event: newEvent,
            message: 'Successfully Added!'
        })
}));

//Updating the Event
app.put('/:id',validateEvent, catchAsync( async (req, res) => {
    const { id } = req.params;
    try {
        const UpdatedEvent = await Event.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.json({
            event: UpdatedEvent,
            message: 'Updated Successfully!'
        })
    } catch (error) {
        res.status(404).json(error);
    }
}));



app.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findOneAndDelete(id);
        res.json({
            message: 'DELETED SUCCESSFULLY!'
        })
    } catch (error) {
        res.json(error);
    }
}));





app.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const foundEvent = await Event.findById(id).populate('reviews');
        res.json(foundEvent);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));


module.exports = router;