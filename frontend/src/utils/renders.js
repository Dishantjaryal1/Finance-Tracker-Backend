import axios from "axios";
import { toast } from "react-hot-toast";

// Fetch all user expenses
export const getUserExpenses = async (userId) => {
  try {
    const response = await axios.post("http://localhost:4000/expenses/allExpenses", {
      userId,
    });

    const exp = response.data.message.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return exp;
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to fetch expenses. Please try again!");
    return []; // Return an empty array to avoid issues in components
  }
};

// Create a new expense
export const createExpense = async (expInfo) => {
  try {
    const response = await axios.post("http://localhost:4000/expenses/addExpense", expInfo);

    if (response.data.statusCode !== 200) {
      toast.error(response.data.message);
      return false; // Indicate failure to the caller
    }

    toast.success("Expense added successfully!");
    return true; // Indicate success to the caller
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to add expense. Please try again!");
    return false; // Indicate failure to the caller
  }
};

// Delete an expense
export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.post("http://localhost:4000/expenses/deleteExpense", {
      expenseId,
    });

    if (response.data.statusCode === 200) {
      toast.success("Expense deleted successfully!");
      return { success: true };
    }

    toast.error(response.data.message || "Failed to delete expense!");
    return { success: false };
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    toast.error("An error occurred while deleting the expense. Please try again!");
    return { success: false };
  }
};

// Send an email
export const sendEmail = async (sender, data) => {
  try {
    const response = await axios.post("http://localhost:4000/expenses/sendEmail", {
      recipient: sender,
      body: data,
    });
    toast.success("Email sent successfully!");
    return response;
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to send email. Please try again!");
    return null; // Return null to indicate failure
  }
};



