
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BikeSchema = new Schema({

    owner: { type: String },
    email: { type: String },
    
    name: {
        type: String,
        required: [true, 'Name required'],
    },

    desc: {
        type: String,
        required: [true, 'Description required'],
        maxlength: [200, 'Description max 200 characters']
    },

    price: {
        type: Number,
        required: [true, 'Price required'],
        min: [1, 'Minimum price $1']
    },

    city: {
        type: String,
        required: [true, 'City required']
    }

}, {timestamps: true});

mongoose.model('Bike', BikeSchema);