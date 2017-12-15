
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueCheck = require('mongoose-unique-validator');

const UserSchema = new Schema({
    
    bikes: [{type: Schema.Types.ObjectId, ref: 'Bike'}],
    
    blocked: { type: Boolean, default: false },
    limit: { type: Date },
    
    email: {
        type: String, unique: [true], trim: true,
        required: [true, 'Email required'],
        uniqueCaseInsensitive: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },

    first: {
        type: String, trim: true,
        required: [true, 'First name required'],
        minlength: [3, 'First name must be 3 characters min.']
    },

    last: {
        type: String, trim: true,
        required: [true, 'Last name required'],
        minlength: [3, 'Last name must be 3 characters min.']
    },

    _pw: {
        type: String,
        required: [true, 'Password required'],
        minlength: [8, 'Password must be 8 characters min.'],
        maxlength: [32, 'Password must be 32 characters max.']
    },

    _pwconf: {
        type: String,
        required: [true, 'Confirmation required'],
        validate: function(pwconf){
            if(pwconf !== this._pw){
                this.invalidate('pwconf', 'Confirmation does not match');
            }
        }
    }
}, {timestamps: true});

// unique plugin
UserSchema.plugin(uniqueCheck, {message: 'Duplicate email found' });

// hash password and reset pwconf
UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(this._pw, 10, (err, hashedPass) => {
        user._pw = hashedPass;
        user._pwconf = undefined;
        next();
    });
});

// check password prior to login
UserSchema.methods.checkPW = function(password, cb){
    bcrypt.compare(password, this._pw, (err, good) => {
        if(err){ return cb(err) }
        else { cb(null, good); }
    });
}

mongoose.model('User', UserSchema);