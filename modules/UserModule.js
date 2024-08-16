const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true // Corrected from `require` to `required`
    },
    email:{
        type:String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
    },
    // If each user has one associated product, this should be changed to an array if multiple products are allowed
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Ensure this matches your Product model's name
    }],
    fullname: {
        type: String,
        required: true // Corrected from `require` to `required`
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// Applying the passport-local-mongoose plugin to the schema
userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
