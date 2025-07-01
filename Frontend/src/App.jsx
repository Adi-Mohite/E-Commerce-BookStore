import React from 'react';
import Home from './home/Home';
import { Route, Routes } from "react-router-dom";
import Courses from './components/courses/Courses.jsx';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Cart from "./components/Cart";
import OrdersPage from "./components/OrdersPage";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Users from "./components/admin/Users.jsx"; 
import Orders from "./components/admin/Orders.jsx"; 
import Sales from "./components/admin/Sales.jsx"; 
import Contact from './components/Contact.jsx';
import UsersFeedback from "./components/admin/UsersFeedback.jsx"
import About from './components/About.jsx';

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrdersPage />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="about" element={<About />} />

          
          <Route
            path="/course"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />

       
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sales" element={<Sales />} />
            <Route path="feedback" element={<UsersFeedback />} />
           
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
