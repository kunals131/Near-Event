const { number } = require('joi');
const Joi = require('joi');

module.exports.eventSchema = Joi.object({
    title : Joi.string().required(),
    price : Joi.number().required().min(0),
    location : Joi.string().required()
}).required();

module.exports.reviewSchema = Joi.object({
    rating : Joi.number().required(),
    body : Joi.string().required()
})