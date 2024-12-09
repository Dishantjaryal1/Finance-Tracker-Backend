import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';
import LoadingBar from 'react-top-loading-bar';
import ExpenseChart from '../components/ExpenseChart';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [note, setNote] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);

  const footerRef = useRef(null);
  const ref = useRef(null);

  const navbarText = "Expense Dashboard";
  document.title = 'Dashboard';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }

    const fetchExpenses = async () => {
      const expenses = await getUserExpenses(userdata._id);
      setUserexp(Array.isArray(expenses) ? expenses : []);
    };
    fetchExpenses();
  }, [userdata._id, navigate]);

  const getTotalIncome = () => {
    return Array.isArray(userexp)
      ? userexp.reduce((total, exp) => exp.type === "income" ? total + exp.amount : total, 0)
      : 0;
  };

  const getTotalExpense = () => {
    return Array.isArray(userexp)
      ? userexp.reduce((total, exp) => exp.type === "expense" ? total + exp.amount : total, 0)
      : 0;
  };

  const exp = userexp.filter(expense => expense.type === "expense");
  const inc = userexp.filter(expense => expense.type === "income");

  const handleAddTransaction = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    if (type === "expense" && !category) {
      alert('Please select a category!');
      return;
    }
    if (!selectDate) {
      alert('Please select a date!');
      return;
    }

    const expInfo = {
      usersid: userdata._id,
      category,
      date: selectDate,
      amount: parseFloat(amount),
      note,
      type,
    };

    try {
      ref.current.staticStart();
      await createExpense(expInfo);
      const updatedExpenses = await getUserExpenses(userdata._id);
      setUserexp(updatedExpenses);

      setAmount(0);
      setCategory("");
      setType("expense");
      setNote("");
      setSelectedDate(null);

      ref.current.complete();
    } catch (error) {
      console.error("Error adding transaction:", error);
      ref.current.complete();
      alert("An error occurred while adding the transaction.");
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`http://localhost:4000/expenses/deleteExpense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expenseId,
          userId: userdata._id,
        }),
      });

      const result = await response.json();
      if (result.statusCode === 201) {
        setUserexp((prev) => prev.filter((expense) => expense._id !== expenseId));
      } else {
        console.error('Error:', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("An error occurred while deleting the expense.");
    }
  };

  const handleScrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col bg-gray-100 font-sans">
      <LoadingBar color="orange" ref={ref} />

      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
        <NavBar text={navbarText} onContactClick={handleScrollToFooter} />
      </div>

      <div className="flex-1 p-8 pt-20 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">Total Expense</div>
            <div className="text-3xl font-bold text-orange-500">₹ {getTotalExpense()}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">Total Income</div>
            <div className="text-3xl font-bold text-green-500">₹ {getTotalIncome()}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">Balance</div>
            <div className="text-3xl font-bold text-blue-500">₹ {getTotalIncome() - getTotalExpense()}</div>
          </div>
        </div>

        <div className="flex gap-8 mb-8">
          <div className="w-4 flex-grow">
            {type === "expense" && <ExpenseChart expenses={exp} type="expense" />}
            {type === "income" && <ExpenseChart expenses={inc} type="income" />}
          </div>

          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col">
            <div className="text-2xl font-semibold text-gray-800">Create Transaction</div>
            <div className="flex flex-col gap-4 mt-4 flex-grow">
              <select
                id="type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory("");
                }}
                className="p-3 rounded-lg border"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=" Enter Amount"
                className="p-3 rounded-lg border"
              />
              <select
                id="categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 rounded-lg border"
              >
                <option value="">--Select Category--</option>
                {type === "expense" ? (
                  <>
                    <option value="Grocery">Grocery</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Food">Food</option>
                    <option value="other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="salary">Salary</option>
                    <option value="freeLance">FreeLance</option>
                    <option value="trading">Trading</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-3 rounded-lg border"
                placeholderText="Select Date"
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note"
                className="p-3 rounded-lg border"
              />
              <button
                onClick={handleAddTransaction}
                className="mt-4 bg-blue-500 text-white p-3 rounded-lg"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="col-span-1 p-4">
              <h3 className="font-semibold text-xl mb-4">Income</h3>
              {inc.map((income) => (
                <div key={income._id} className="p-4 bg-gray-200 rounded-lg shadow mb-4">
                  <div className="text-xl font-semibold">{income.category}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(income.date).toLocaleDateString()}
                  </div>
                  <div className="text-xl font-bold text-green-500">₹{income.amount}</div>
                  {income.note && (
                    <div className="text-sm text-gray-600 italic">Note: {income.note}</div>
                  )}
                  <button
                    onClick={() => handleDeleteExpense(income._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="col-span-1 p-4">
              <h3 className="font-semibold text-xl mb-4">Expense</h3>
              {exp.map((expense) => (
                <div key={expense._id} className="p-4 bg-gray-200 rounded-lg shadow mb-4">
                  <div className="text-xl font-semibold">{expense.category}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                  <div className="text-xl font-bold text-orange-500">₹{expense.amount}</div>
                  {expense.note && (
                    <div className="text-sm text-gray-600 italic">Note: {expense.note}</div>
                  )}
                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer
        ref={footerRef} 
        className="bg-gray-800 text-white py-10 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-4 text-gray-300">
            We’re here to help! Reach out to us anytime at{" "}
            <a
              href="mailto: trackit53@gmail.com"
              className="text-orange-400 underline"
            >
              trackit53@gmail.com
            </a>.
          </p>
          <p className="mt-2 text-gray-300">
            Follow us on social media for updates and tips.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/" className="text-gray-300 hover:text-orange-400">Facebook</a>
            <a href="/" className="text-gray-300 hover:text-orange-400">Twitter</a>
            <a href="/" className="text-gray-300 hover:text-orange-400">Instagram</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Dashboard;
