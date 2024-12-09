const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    usersid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,  
        required: true,
    },
    note: {
        type: String,
    },
}, {
    timestamps: true, 
});

const expenseModel = mongoose.model('Expense', expenseSchema); 

module.exports = expenseModel;
