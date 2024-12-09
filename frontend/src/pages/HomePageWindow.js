/* eslint-disable jsx-a11y/alt-text */

// eslint-disable-next-line
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import NavBar from "../components/NavBar";
import { getUserExpenses } from '../utils/renders';

function Home() {
  const navigate = useNavigate();
  const [userdata] = useState(JSON.parse(localStorage.getItem("User")));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);
  const footerRef = useRef(null); // Ref for footer

  document.title = "Home";

  useEffect(() => {
    if (!localStorage.getItem("User")) {
      navigate("/login");
    } else {
      setUserexp(Promise.resolve(getUserExpenses(userdata._id)).then((data) => setUserexp(data)));
    }
  }, [userdata._id, navigate]);

  // Function to scroll to the footer
  const handleScrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full min-h-screen font-mont w-full bg-white">
      <LoadingBar color="orange" ref={ref}></LoadingBar>
      {/* Pass the scroll handler to NavBar */}
      <NavBar data={userexp} onContactClick={handleScrollToFooter}></NavBar>

      {/* Hero Section */}
      <section className="bg-white py-20 px-10">
        <div className="max-w-7xl mx-auto text-center"><br />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Welcome to <span className="text-orange-500">TrackIt - A Finance Tracker</span>
          </h1>
          <br />
          <p className="mt-6 text-lg text-gray-600">
            Managing finances is a challenge for students and employees alike. From overspending to lack of budgeting, these problems can be overwhelming.
            Our app offers a seamless way to track expenses and income, ensuring financial stability and peace of mind.
          </p>
          <img
            src="https://images.unsplash.com/photo-1723095816936-fcda04ba0ece?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGV4cGVuc2UlMjBUcmFja2VyfGVufDB8fDB8fHww"
            alt="Overspending"
            className="mx-auto mt-8 w-[800px] h-[400px] object-cover rounded-lg shadow-lg"
          />

        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Problems We Address</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://plus.unsplash.com/premium_photo-1678823283309-ca3b4860e8a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8T3ZlcnNwZW5kaW5nfGVufDB8fDB8fHww"
                alt="Overspending"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Overspending</h3>
              <p className="mt-2 text-gray-600">
                Struggling to keep track of expenses often leads to overspending and financial stress.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1494459158735-82f8feb14abb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fExhY2slMjBvZiUyMEJ1ZGdldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Lack of budgeting"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Lack of Budgeting</h3>
              <p className="mt-2 text-gray-600">
                Many people don’t have a clear plan for managing their income and expenses effectively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1506784242126-2a0b0b89c56a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFVub3JnYW5pemVkJTIwRmluYW5jZXN8ZW58MHx8MHx8fDA%3D"
                alt="Unorganized finances"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Unorganized Finances</h3>
              <p className="mt-2 text-gray-600">
                Tracking multiple income and expense sources without a system is time-consuming and confusing.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-20 px-10 bg-orange-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">How We Solve These Problems</h2>
          <p className="mt-4 text-lg text-gray-700">
            Our finance tracker provides powerful features to help you take control of your finances.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img
                className="w-40 h-40 rounded-full object-cover mx-auto"
                src="https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Real-Time Expense Tracking</h3>
              <p className="mt-3 text-gray-600">
                Log and monitor your expenses in real-time to stay on top of your spending habits.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img
                className="w-40 h-40 rounded-full object-cover mx-auto"
                src="https://images.pexels.com/photos/7948058/pexels-photo-7948058.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Detailed Visual Insights</h3>
              <p className="mt-3 text-gray-600">
                Use interactive charts and graphs to analyze your income and expenses effortlessly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                className="w-40 h-40 rounded-full object-cover mx-auto"
                src="https://images.pexels.com/photos/4386324/pexels-photo-4386324.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Expense Categorization</h3>
              <p className="mt-3 text-gray-600">
                Organize your expenses into categories like rent, groceries, and entertainment for better clarity.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                className="w-40 h-40 rounded-full object-cover mx-auto"
                src="https://images.pexels.com/photos/13801827/pexels-photo-13801827.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Set Financial Goals</h3>
              <p className="mt-3 text-gray-600">
                Define financial goals and track your progress to achieve them within your timeline.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                className="w-40 h-40 rounded-full object-cover mx-auto"
                src="https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Monthly Budget Planner</h3>
              <p className="mt-3 text-gray-600">
                Plan your monthly budget with ease to avoid overspending and save more.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                className="w-40 h-40 rounded-full object-cover mx-auto"
                src="https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?auto=compress&cs=tinysrgb&w=1200"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Data Privacy & Security</h3>
              <p className="mt-3 text-gray-600">
                Rest assured that your financial data is protected with robust security measures.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer Section */}
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

export default Home;
