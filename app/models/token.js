var mongoose = require('mongoose');

// Define our token schema
var TokenSchema   = new mongoose.Schema({
    value: { type: String, required: true },
    user_id: { type: String, required: true },
    client_id: { type: String, required: true },
    osVersion:{type:String},
    resolution:{type:Number},
    scope: { type: String},
    created : {type: Date, expires: 60*60*24*14}
});

TokenSchema.pre('save', function(next){
    var now = new Date();
    if ( !this.created ) {
        this.created = now;
    }
    next();
});


// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);
