const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: { // Changed to camelCase for consistency
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Ensure this matches your User model's name
    },
    productId: { // Changed to camelCase for consistency
        type: String,
        unique: true,
        required: true // Corrected from `require` to `required`
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true // Corrected from `require` to `required`
    },
    price: {
        type: Number,
        required: true // Corrected from `require` to `required`
    },
    // Number of products in inventory
    inventory: {
        type: Number,
        required: true,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// Capitalized model name for consistency
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
