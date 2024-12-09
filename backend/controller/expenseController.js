const expenseModel = require('../db/expenseModel');
const userModel = require('../db/userModel');
const sendEmailWithAttachment = require('../utils/emailSend');
const { error, success } = require('../utils/handler');

const createExpense = async (req, res) => {
    try {
        
        const { amount, date, usersid, note ,category ,type} = req.body;
        if (!amount || !date || !usersid || !type) {
            return res.send(error(401, "All Details Are Required"));
        }
        if(type==="expense"){
            if(!category){
                return res.send(error(401, "All Details Are Required"));
            }
        }

        const newExpense = await expenseModel.create(req.body);
        const userToUse = await userModel.findById(usersid).populate('expense_id');
        userToUse.expense_id.push(newExpense._id);

        await newExpense.save();
        await userToUse.save();

        return res.send(success(200, newExpense));

    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { expenseId, userId } = req.body;

        console.log(`Attempting to delete expense with expenseId: ${expenseId} and userId: ${userId}`);

        const expense = await expenseModel.findById(expenseId);
        const user = await userModel.findById(userId);

        if (!expense || !user) {
            return res.send(error(401, `Invalid ${!expense ? 'expense' : 'user'}`));
        }

        if (user.expense_id.includes(expenseId)) {

            await expenseModel.findByIdAndDelete(expenseId);

           
            const index = user.expense_id.indexOf(expenseId);
            user.expense_id.splice(index, 1);

            await user.save();
        }
        return res.send(success(201, { respo: 'Successfully Deleted', user }));
    } catch (e) {
        console.error("Error during delete:", e.message);  
        return res.send(error(401, e.message));
    }
};


const getAllExpenses = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).populate('expense_id');

        // Sorting expenses by date (newest first)
        const sortedExpenses = user.expense_id.sort((a, b) => new Date(b.date) - new Date(a.date));

        return res.send(success(200, sortedExpenses));

    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const getCategoryExpense = async (req, res) => {
    try {
        const { userId, category } = req.body;

        if (!userId || !category) {
            return res.send(error(400, "User ID and Category are required"));
        }

        const user = await userModel.findById(userId).populate('expense_id');
        const filteredExpenses = user.expense_id.filter(expense => expense.category === category);

        return res.send(success(200, filteredExpenses));

    } catch (e) {
        return res.send(error(401, e.message));
    }
};

const emailSender = (req, res) => {
    try {
        const { recipient, body } = req.body;

        sendEmailWithAttachment(recipient, body);
        return res.send(success(201, "Email Sent"));

    } catch (error) {
        return res.send(error(401, "Error sending email"));
    }
};

module.exports = {
    createExpense,
    deleteExpense,
    getCategoryExpense,
    getAllExpenses,
    emailSender
};
