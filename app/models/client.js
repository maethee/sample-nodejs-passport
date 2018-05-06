// Load required packages
var mongoose = require('mongoose');


// Define our client schema
var ClientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    clientId: { type: String, unique: true, required: true },
    secretKey: { type: String, required: true },
    filterFields: {type: String }
}, { timestamps: { createdAt: 'created',updatedAt: 'modified' } });

// Export the Mongoose model
module.exports = mongoose.model('Client', ClientSchema);
