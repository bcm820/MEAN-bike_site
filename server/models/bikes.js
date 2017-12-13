
const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({

    _owner: {type: Schema.Types.ObjectId, ref: 'User'},
    
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
    },

    url: {
        type: String,
        required: [true]
    }

}, {timestamps: true});

mongoose.model('Bike', BikeSchema);