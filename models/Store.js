const mongoose = require('mongoose')

const fakestoreSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        rating: {
            rate: {
                type: Number
            },
            count: {
                type: Number
            }
        }
    }
);

const Store = mongoose.model('Store',fakestoreSchema)
module.exports = Store;